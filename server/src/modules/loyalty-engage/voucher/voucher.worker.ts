import cron from 'node-cron'
import { prisma } from '@/database/prisma'
import { redisClient } from '@/database/redis'
import { createLogger } from '@/common/logger'
import { VOUCHER_TOTAL_KEY_PREFIX } from './voucher.repo'

const logger = createLogger('VoucherReconciliationWorker')

export interface ReconciliationReport {
  scannedCount: number
  reconciledCount: number
  discrepancies: Array<{
    voucherId: number
    code: string
    dbCount: number
    redisCount: number
    delta: number
  }>
  errors: Array<{
    code: string
    error: string
  }>
}

export async function reconcileVouchers(): Promise<ReconciliationReport> {
  logger.info('Starting nightly voucher reconciliation job...')

  const report: ReconciliationReport = {
    scannedCount: 0,
    reconciledCount: 0,
    discrepancies: [],
    errors: [],
  }

  try {
    const activeVouchers = await prisma.voucher.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      select: {
        id: true,
        code: true,
        usedCount: true,
        totalUsageLimit: true,
        endDate: true,
      },
    })

    report.scannedCount = activeVouchers.length
    logger.info({ count: activeVouchers.length }, 'Vouchers fetched for reconciliation')

    for (const voucher of activeVouchers) {
      try {
        const totalKey = `${VOUCHER_TOTAL_KEY_PREFIX}${voucher.code}`
        const redisCountStr = await redisClient.get(totalKey)

        if (redisCountStr === null) {
          const now = Date.now()
          const endTimestamp = new Date(voucher.endDate).getTime()
          const ttlSeconds = Math.max(Math.ceil((endTimestamp - now) / 1000) + 86400, 3600)

          await redisClient.set(totalKey, voucher.usedCount.toString(), 'EX', ttlSeconds, 'NX')
          logger.debug(
            { voucherId: voucher.id, code: voucher.code, seededCount: voucher.usedCount },
            'Voucher key seeded in Redis during reconciliation (cold-start recovery)',
          )
          continue
        }

        const redisCount = parseInt(redisCountStr, 10)
        const dbCount = voucher.usedCount

        if (redisCount !== dbCount) {
          const delta = redisCount - dbCount

          logger.warn(
            {
              voucherId: voucher.id,
              code: voucher.code,
              dbCount,
              redisCount,
              delta,
            },
            'Reconciliation discrepancy detected: Redis count differs from PostgreSQL count',
          )

          await prisma.voucher.update({
            where: { id: voucher.id },
            data: { usedCount: redisCount },
          })

          report.reconciledCount++
          report.discrepancies.push({
            voucherId: voucher.id,
            code: voucher.code,
            dbCount,
            redisCount,
            delta,
          })

          logger.info(
            {
              voucherId: voucher.id,
              code: voucher.code,
              previousDbCount: dbCount,
              syncedCount: redisCount,
            },
            'Voucher reconciliation completed: PostgreSQL synchronized with Redis authoritative count',
          )
        }
      } catch (itemError: unknown) {
        const errorMsg = itemError instanceof Error ? itemError.message : String(itemError)
        logger.error(
          { voucherId: voucher.id, code: voucher.code, err: itemError },
          'Error reconciling individual voucher, skipping to next item (fault-tolerant)',
        )
        report.errors.push({
          code: voucher.code,
          error: errorMsg,
        })
      }
    }

    logger.info(
      {
        scanned: report.scannedCount,
        reconciled: report.reconciledCount,
        discrepancyCount: report.discrepancies.length,
        errorCount: report.errors.length,
      },
      'Nightly voucher reconciliation job finished successfully',
    )
  } catch (batchError) {
    logger.error({ err: batchError }, 'Fatal error during voucher reconciliation batch process')
    throw batchError
  }

  return report
}

export function startVoucherReconciliationCron(cronExpression = '0 2 * * *') {
  logger.info({ schedule: cronExpression }, 'Registering voucher reconciliation cron job')

  const task = cron.schedule(cronExpression, async () => {
    logger.info('Scheduled cron trigger: initiating voucher reconciliation')
    try {
      await reconcileVouchers()
    } catch (err) {
      logger.error({ err }, 'Unhandled exception in scheduled voucher reconciliation')
    }
  })

  return task
}
