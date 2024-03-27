import { type Request, type Response } from 'express'
import { AIRequest } from '../utils/AIRequest'
import { assistants, type responseAssistant } from '../data/adivinheACoisa/assistants'
import * as fs from 'fs'

export default class Service {
  async ask (req: Request, res: Response): Promise<Response> {
    const response = await AIRequest(JSON.stringify(req.body.question))

    return res.status(200).json(JSON.stringify(response.choices[0].message.content))
  }

  async getAssistants (req: Request, res: Response): Promise<Response> {
    const response = assistants.map((curr) => {
      const { instructions, ...rest } = curr
      const image = fs.readFileSync(curr.profilePicPath)
      const base64Image = Buffer.from(image).toString('base64')
      const newObj: responseAssistant = {
        ...rest,
        profilePic: base64Image
      }
      return newObj
    })

    return res.status(200).json(JSON.stringify(response))
  }
}
