export interface AccessTokenPayload {
  userId: number
  roleId: number
  email?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
    }
  }
}

export {}