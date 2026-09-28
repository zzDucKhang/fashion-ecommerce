declare namespace Express {
  interface Request {
    user?: { userId: number; roleId: number, email?: string }
  }
}

