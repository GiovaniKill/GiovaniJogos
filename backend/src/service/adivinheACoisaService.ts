import { type Request, type Response } from 'express'
import { request } from '../utils/AIRequest'

export default class Service {
  async ask (req: Request, res: Response): Promise<Response> {
    const response = await request(JSON.stringify(req.body.question))

    return res.status(200).json(JSON.stringify(response.choices[0].message.content))
  }
}
