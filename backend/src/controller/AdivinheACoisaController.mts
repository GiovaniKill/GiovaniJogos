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

  async logout (req: Request, res: Response): Promise<Response> {
    res.clearCookie('jwt_token')

    return res.status(200).json({ message: 'Logged out succesfully' })
  }

  async getWelcomeMessage (req: Request, res: Response): Promise<Response> {
    const { assistantId } = req.params
    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof +assistantId !== 'number' || typeof email !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const result = await this.service.getWelcomeMessage(email, +assistantId)

    return res.status(200).json(JSON.stringify(result))
  }

  async ask (req: Request, res: Response): Promise<Response> {
    const { question, assistantId } = req.body
    const { payload: { data: { wordId, day, month, year, email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    const date = `${year}/${month}/${day}`

    if (typeof wordId !== 'string' ||
    typeof question !== 'string' ||
    typeof +assistantId !== 'number') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const { message, foundTheAnswer } = await this.service.ask({ question, assistantId: +assistantId, wordId, date, email })

    return res.status(200).json(JSON.stringify(
      {
        message: message.message,
        createdAt: message.createdAt,
        foundTheAnswer
      }))
  }

  async getAssistants (req: Request, res: Response): Promise<Response> {
    const result = await this.service.getAssistants()

    return res.status(200).json(JSON.stringify(result))
  }

  async setGameOver (req: Request, res: Response): Promise<Response> {
    const { assistantId } = req.body
    const { payload: { data: { wordId, email, day, month, year } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof wordId !== 'string' || typeof assistantId !== 'number' || typeof email !== 'string' ||
      typeof day !== 'string' || typeof month !== 'string' || typeof year !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const date = `${year}/${month}/${day}`

    const affectedRows = await this.service.endGame(email, wordId, date)

    if (affectedRows[0] === 0) {
      return res.status(400).json(JSON.stringify({ error: 'No game found' }))
    }

    const response = await this.service.getGameOverMessage({ wordId, assistantId, email, result: 'defeat' })

    return res.status(200).json(JSON.stringify(response))
  }

  async getOrCreateGame (req: Request, res: Response): Promise<Response> {
    const { payload: { data: { wordId, email, day, month, year } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    const date = `${year}/${month}/${day}`

    const { triesLeft, status, newGame } = await this.service.getOrCreateGame(email as string, wordId as string, date)

    return res.status(200).json(JSON.stringify({ triesLeft, day, month, year, status, newGame }))
  }

  async createMessage (req: Request, res: Response): Promise<Response> {
    const { assistantId, message, role } = req.body
    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof +assistantId !== 'number' || typeof message !== 'string' || typeof email !== 'string' ||
    typeof role !== 'string' || !(role === 'user' || role === 'assistant')) {
      throw new HTTPError(400, 'Malformed request')
    }

    const response = await this.service.createMessage({ email, assistantId: +assistantId, message, role })

    return res.status(201).json(JSON.stringify({ createdAt: response.createdAt }))
  }

  async deleteAllConversationMessages (req: Request, res: Response): Promise<Response> {
    const { assistantId } = req.params
    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof +assistantId !== 'number' || typeof email !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    const deletedRows = await this.service.deleteAllConversationMessages(email, +assistantId)

    return res.status(201).json(JSON.stringify({ message: `Succesfully deleted ${deletedRows} messages` }))
  }

  async getAllLastMessages (req: Request, res: Response): Promise<Response> {
    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof email !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    const messages = await this.service.getAllLastMessages(email, 30)

    return res.status(201).json(JSON.stringify({ messages }))
  }

  async getLastMessagesFromReference (req: Request, res: Response): Promise<Response> {
    const { assistantId, createdAt } = req.params
    const { payload: { data: { email } } } = decodeToken(getCookie('jwt_token', req.headers.cookie ?? ''))

    if (typeof +assistantId !== 'number' || typeof email !== 'string' || typeof createdAt !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    const messages = await this.service.getLastMessagesFromReference(email, +assistantId, 30, createdAt)

    return res.status(201).json(JSON.stringify({ messages }))
  }
}
