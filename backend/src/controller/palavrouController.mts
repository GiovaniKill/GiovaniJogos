import { type Request, type Response } from 'express'
import type PalavrouService from '../service/palavrouService.mjs'
import { decodeToken } from '../utils/TokenManager.mjs'
import { getCookie } from '../utils/handleCookies.mjs'

export default class PalavrouController {
  private readonly service

  constructor (palavrouService: PalavrouService) {
    this.service = palavrouService
  }

  async getToken (req: Request, res: Response): Promise<Response> {
    const token = await this.service.getToken()

    res.cookie('palavrou_jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    return res.status(200).json(JSON.stringify({ message: 'ok', token }))
  }

  async check (req: Request, res: Response): Promise<Response> {
    const { word } = req.params
    const { payload: { data: { day, month, year } } } = decodeToken(
      getCookie('palavrou_jwt', req.headers.cookie ?? ''))

    console.log(day, month, year)

    if (typeof word !== 'string' || word.length !== 6) {
      return res.status(400).json({ message: 'Invalid word' })
    }

    if (typeof +year !== 'number' || typeof +month !== 'number' || typeof +day !== 'number') {
      return res.status(400).json({ message: 'Invalid date' })
    }

    const response = this.service.check(word, +year, +month, +day)

    return res.status(200).json(response)
  }

  async getAnswer (req: Request, res: Response): Promise<Response> {
    const { payload: { data: { day, month, year } } } = decodeToken(
      getCookie('palavrou_jwt', req.headers.cookie ?? ''))

    if (typeof +year !== 'number' || typeof +month !== 'number' || typeof +day !== 'number') {
      return res.status(400).json({ message: 'Invalid date' })
    }

    const response = this.service.getAnswer(+year, +month, +day)

    return res.status(200).json(JSON.stringify({ answer: response }))
  }
}
