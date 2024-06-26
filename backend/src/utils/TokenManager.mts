import jwt from 'jsonwebtoken'
import 'dotenv/config'
import HTTPError from './HTTPError.mjs'

export const createToken = (payload: object, expiresIn: number): string => {
  const secret = process.env.JWT_SECRET ?? 'secret' as jwt.Secret
  const config: jwt.SignOptions = {
    expiresIn: `${expiresIn}d`,
    algorithm: 'HS256'
  }

  const token = jwt.sign({ data: payload }, secret, config)

  return token
}

export const validateToken = (token: string): string | jwt.JwtPayload => {
  const secret = process.env.JWT_SECRET ?? 'secret' as jwt.Secret
  try {
    const result = jwt.verify(token, secret)
    return result
  } catch (e) {
    throw new HTTPError(401, 'Token must be valid')
  }
}

export const decodeToken = (token: string): any => {
  const result = jwt.decode(token, { complete: true })
  return result
}
