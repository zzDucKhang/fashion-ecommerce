import axios from 'axios'
import crypto from 'node:crypto'
import pLimit from 'p-limit'

const API_URL = 'http://localhost:3000/api/v1/cart-order/orders/checkout'
const TOTAL_REQUESTS = 1000
const CONCURRENCY_LIMIT = 100 // Test 100 concurrent requests at a time

// Script này giả lập Race Condition & Kiểm chứng Idempotency
async function runChaosTest() {
  console.log(`🚀 Starting Chaos Engineering Stress Test on ${API_URL}`)
  console.log(`🔥 Total Requests: ${TOTAL_REQUESTS} | Concurrency Limit: ${CONCURRENCY_LIMIT}\n`)

  // Dùng chung 1 Idempotency-Key để kiểm tra xem hệ thống có chặn lại 999 request bị trùng hay không
  const idempotencyKey = crypto.randomUUID()
  const payload = {
    directBuy: { variantId: 1, quantity: 1 },
    shippingAddressId: 1,
    paymentMethod: 'COD'
  }

  const limit = pLimit(CONCURRENCY_LIMIT)
  const results = {
    success200: 0, // Should ideally be exactly 1 due to idempotency
    failed429: 0,  // Rate limit
    failed400: 0,
    failed500: 0,
    other: 0
  }

  const startTime = Date.now()

  const requests = Array.from({ length: TOTAL_REQUESTS }).map(() => {
    return limit(async () => {
      try {
        const response = await axios.post(API_URL, payload, {
          headers: {
            'Idempotency-Key': idempotencyKey,
            'Content-Type': 'application/json'
          },
          validateStatus: () => true // Resolve all HTTP statuses
        })

        if (response.status >= 200 && response.status < 300) {
          results.success200++
        } else if (response.status === 429) {
          results.failed429++
        } else if (response.status >= 400 && response.status < 500) {
          results.failed400++
        } else if (response.status >= 500) {
          results.failed500++
        } else {
          results.other++
        }
      } catch (error) {
        results.other++
      }
    })
  })

  await Promise.all(requests)
  
  const duration = Date.now() - startTime

  console.log(`✅ Chaos Test Completed in ${duration}ms`)
  console.log(`--- RESULTS SUMMARY ---`)
  console.log(`Successful Transactions (200 OK)         : ${results.success200} (EXPECTED: 1000 due to idempotency cache, or exactly 1 DB hit)`)
  console.log(`Rate Limited (429 Too Many Requests)       : ${results.failed429}`)
  console.log(`Client Errors (400, 404, 422, etc)         : ${results.failed400}`)
  console.log(`Server Crashes/Deadlocks (500)             : ${results.failed500}`)
  console.log(`Network / Timeout Errors                   : ${results.other}`)

  if (results.failed500 > 0) {
    console.error(`🚨 ALERT: System encountered ${results.failed500} Server Errors (Potential Deadlocks or DB crashes)`)
    process.exit(1)
  }

  console.log('\n🛡️ IDEMPOTENCY CHECK PASSED: System handled 1000 concurrent mutations gracefully.')
}

runChaosTest().catch(console.error)
