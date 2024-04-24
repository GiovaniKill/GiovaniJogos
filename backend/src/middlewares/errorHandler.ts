import { type NextFunction, type Request, type Response } from 'express'
import type HTTPError from '../utils/HTTPError.js'

const errorHandler = (err: HTTPError, req: Request, res: Response, _next: NextFunction): Response => {
  if (err.status !== undefined) return res.status(err.status).json({ message: err.message })
  return res.status(500).json({ message: err.message })
}

export default errorHandler
