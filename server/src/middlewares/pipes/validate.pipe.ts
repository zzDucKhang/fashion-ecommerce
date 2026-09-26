import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny, ZodError } from 'zod'

interface RequestValidators {
  params?: ZodTypeAny
  query?: ZodTypeAny
  body?: ZodTypeAny
}

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validate & Transform Params
      if (validators.params) {
        const parsedParams = await validators.params.parseAsync(req.params)
        req.params = parsedParams as any
      }

      // 2. Validate & Transform Query
      if (validators.query) {
        const parsedQuery = await validators.query.parseAsync(req.query)
        for (const key of Object.keys(req.query)) {
          delete (req.query as any)[key]
        }
        Object.assign(req.query, parsedQuery)
      }

      // 3. Validate & Transform Body (Chấp nhận cả ZodEffects từ .superRefine)
      if (validators.body) {
        const parsedBody = await validators.body.parseAsync(req.body)
        req.body = parsedBody
      }

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          statusCode: 422,
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: error.flatten().fieldErrors,
        })
      }

      return next(error)
    }
  }
}