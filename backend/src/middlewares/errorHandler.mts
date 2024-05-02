import 'dotenv/config'
import { type NextFunction, type Request, type Response } from 'express'
import type HTTPError from '../utils/HTTPError.mjs'

const errorHandler = (err: HTTPError, req: Request, res: Response, _next: NextFunction): Response => {
  console.log(err)

  if (err.status !== undefined) return res.status(err.status).json({ message: err.message })
  return res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message })
}

export default errorHandler
