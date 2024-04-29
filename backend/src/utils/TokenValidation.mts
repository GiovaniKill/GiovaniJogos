import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../utils/TokenManager.mjs'
import HTTPError from '../utils/HTTPError.mjs'

const tokenVerification = (req: Request, res: Response, next: NextFunction): void => {
  const { jwt_secret: token } = req.cookies
  if (typeof token !== 'string') throw new HTTPError(400, 'Token must be valid')
  validateToken(token)
  next()
}

export default tokenVerification
