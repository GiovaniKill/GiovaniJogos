import { type Request, type Response } from 'express'
import type AdivinheACoisaService from '../service/adivinheACoisaService.mjs'
import HTTPError from '../utils/HTTPError.mjs'
import { decodeToken } from '../utils/TokenManager.mjs'
import { getCookie } from '../utils/handleCookies.mjs'

export default class AdivinheACoisaController {
  private readonly service: AdivinheACoisaService

  constructor (service: AdivinheACoisaService) {
    this.service = service
  }

  async createUser (req: Request, res: Response): Promise<Response> {
    let { email, subscription } = req.body

    if (typeof email !== 'string' || typeof subscription !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    email = email.trim()
    subscription = subscription.trim()

    const result = await this.service.createUser({ email, subscription })

    return res.status(201).json(JSON.stringify({ email: result.email, message: 'User created succesfully' }))
  }

  async googleLogin (req: Request, res: Response): Promise<Response> {
    // Auto creates user if it is not signep up already
    const { googleJWT } = req.body

    if (typeof googleJWT !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    const token = await this.service.googleLogin(googleJWT)

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    return res.status(202).json(JSON.stringify({ message: 'Login accepted', token }))
  }

  async validateAndRenew (req: Request, res: Response): Promise<Response> {
    // After middleware validation

    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))
    const token = await this.service.generateToken(email as string)

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    return res.status(202).json()
  }

  async ask (req: Request, res: Response): Promise<Response> {
    const { question, assistant } = req.body
    const { payload: { data: { wordID, day, month, year, email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    const date = `${year}/${month}/${day}`

    if (typeof wordID !== 'string' ||
    typeof question !== 'string' ||
    typeof assistant !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const result = await this.service.ask({ question, assistant, wordID, date, email })

    return res.status(200).json(JSON.stringify(result))
  }

  async getAssistants (req: Request, res: Response): Promise<Response> {
    const result = await this.service.getAssistants()

    return res.status(200).json(JSON.stringify(result))
  }

  async getGameOverMessage (req: Request, res: Response): Promise<Response> {
    const { assistant } = req.body
    const { payload: { data: { wordID } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof wordID !== 'string' || typeof assistant !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const response = await this.service.getGameOverMessage({ wordID, assistant })

    return res.status(200).json(JSON.stringify(response))
  }

  async getGame (req: Request, res: Response): Promise<Response> {
    const { payload: { data: { wordID, email, day, month, year } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    const date = `${year}/${month}/${day}`

    const { triesLeft } = await this.service.getOrCreateGame(email as string, wordID as string, date)

    return res.status(200).json(JSON.stringify({ triesLeft, day, month, year }))
  }

  async decreaseTriesLeft (req: Request, res: Response): Promise<Response> {
    const { payload: { data: { wordID, email, day, month, year } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    const date = `${year}/${month}/${day}`

    const response = await this.service.decreaseTriesLeft(email as string, wordID as string, date)

    return res.status(200).json(JSON.stringify({ response }))
  }
}
