import 'dotenv/config'
import { type Request, type Response } from 'express'
import { AIRequest } from '../utils/AIRequest'
import { assistants, type responseAssistant } from '../data/adivinheACoisa/assistants'
import * as fs from 'fs'
import { wordToID, IDToWord } from '../utils/handleID'
import answers from '../data/adivinheACoisa/answers'

export default class Service {
  async ask (req: Request, res: Response): Promise<Response> {
    const { question, assistant, wordID } = req.body

    const thing = IDToWord(JSON.stringify(wordID), JSON.stringify(process.env.THING_PASSWORD) ?? '')

    console.log('------' + thing + '------')

    const assistantInstructions = `O(A) jogador(a) te fará perguntas de sim ou não com o objetivo de
      encontrar uma "coisa" secreta, que hoje é "${thing}".
      Responda com respostas simples como "Sim", "Não", "Também", "Provavelmente sim",
      "Provavelmente não", "Pode ser", "Em partes, sim", "Essa pergunta não pode ser respondida com sim ou não",
      "Não sei responder" ou "Depende de [alguma coisa que você queira completar]". Nunca revele demais sobre a
      "coisa", ela é secreta. Sempre adicione personalidade às suas respostas e use emojis com moderação, mas seja breve.
      Parabenize o(a) jogador(a) caso ele acerte a palavra. A "coisa" que ele deverá acertar é "${thing}".
      Não dê dicas ou converse sobre outros assuntos. Nunca mencione a palavra "${thing}" ou use emojis que
      a representem "${thing}". O(a) jogador(a) te fará várias perguntas, mas você só terá acesso à ultima mensagem
      dele(a)`

    const personality = assistants.find(
      (curr) => curr.name === assistant)?.personality

    const response = await AIRequest(
      JSON.stringify(question),
      JSON.stringify(personality + ' ' + assistantInstructions) ?? '',
      'prédio')

    return res.status(200).json(JSON.stringify(response.choices[0].message.content))
  }

  async getAssistants (req: Request, res: Response): Promise<Response> {
    const response = assistants.map((curr) => {
      const { personality, ...rest } = curr
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

  async getThingId (req: Request, res: Response): Promise<Response> {
    const date = new Date()
    const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)]
    const normalizedAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    return res.status(200).json(wordToID(JSON.stringify(normalizedAnswer), JSON.stringify(process.env.THING_PASSWORD) ?? ''))
  }
}
