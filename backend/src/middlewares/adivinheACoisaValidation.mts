import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../utils/TokenManager.mjs'
import HTTPError from '../utils/HTTPError.mjs'
import { getCookie } from '../utils/handleCookies.mjs'

const adivinheACoisaValidation = (req: Request, res: Response, next: NextFunction): void => {
  const token = getCookie('jwt_token', req.headers.cookie ?? '')

  if (typeof token !== 'string') throw new HTTPError(400, 'Token must be valid')
  validateToken(token)
  next()
}

export default adivinheACoisaValidation
