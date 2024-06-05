import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../utils/TokenManager.mjs'
import HTTPError from '../utils/HTTPError.mjs'
import { getCookie } from '../utils/handleCookies.mjs'

const palavrouValidation = (req: Request, res: Response, next: NextFunction): void => {
  const token = getCookie('palavrou_jwt', req.headers.cookie ?? '')

  if (typeof token !== 'string') throw new HTTPError(400, 'Token must be valid')
  validateToken(token)
  next()
}

export default palavrouValidation
