import 'dotenv/config'
import { type Request, type Response } from 'express'
import { askAI, instructAI } from '../utils/AIRequest.mjs'
import { assistants, type responseAssistant } from '../data/adivinheACoisa/assistants.mjs'
import * as fs from 'fs'
import { wordToID, IDToWord } from '../utils/handleID.mjs'
import answers from '../data/adivinheACoisa/answers.mjs'
import type IUsersRepository from '../repositories/IUsers.repository.mjs'
import HTTPError from '../utils/HTTPError.mjs'

export default class Service {
  private readonly repository: IUsersRepository

  constructor (repository: IUsersRepository) {
    this.repository = repository
  }

  async ask (req: Request, res: Response): Promise<Response> {
    const { question, assistant, wordID } = req.body

    if (typeof wordID !== 'string' ||
    typeof question !== 'string' ||
    typeof assistant !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const treatedWordID = wordID.replace('"', '')
    const answer = IDToWord(treatedWordID, process.env.ANSWER_PASSWORD ?? '')

    const accentuatedAnswer = answers.find((curr) => curr.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === answer)

    const assistantInstructions = `O(A) jogador(a) te fará perguntas de sim ou não com o objetivo de
      encontrar uma "coisa" secreta, que hoje é "${accentuatedAnswer}".
      Responda com respostas simples como "Sim", "Não", "Também", "Provavelmente sim",
      "Provavelmente não", "Pode ser", "Em partes, sim", "Essa pergunta não pode ser respondida com sim ou não",
      "Não sei responder" ou "Depende de [alguma coisa que você queira completar]". Nunca revele demais sobre a
      "coisa", ela é secreta. Sempre adicione personalidade às suas respostas e use emojis com moderação, mas seja breve.
      Parabenize o(a) jogador(a) caso ele acerte a palavra. A "coisa" que ele deverá acertar é "${accentuatedAnswer}".
      Não dê dicas ou converse sobre outros assuntos. Nunca mencione a palavra "${accentuatedAnswer}" ou use emojis que
      a representem "${accentuatedAnswer}". O(a) jogador(a) te fará várias perguntas, mas você só terá acesso à ultima mensagem
      dele(a)`

    const personality = assistants.find(
      (curr) => curr.name === assistant)?.personality

    const response = await askAI(
      JSON.stringify(question),
      JSON.stringify(personality + ' ' + assistantInstructions) ?? '',
      answer, 'gpt-4-0125-preview')

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

  async getThingInfo (req: Request, res: Response): Promise<Response> {
    const date = new Date()
    const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)]
    const normalizedAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    return res.status(200).json(JSON.stringify({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      wordID: wordToID(normalizedAnswer, process.env.THING_PASSWORD ?? '')
    }))
  }

  async getGameOverMessage (req: Request, res: Response): Promise<Response> {
    const { wordID, assistant } = req.body

    if (typeof wordID !== 'string' || typeof assistant !== 'string') {
      return res.status(400).json(JSON.stringify({ error: 'Malformed request' }))
    }

    const treatedWordID = wordID.replace('"', '')
    let answer = ''

    try {
      answer = IDToWord(treatedWordID, process.env.THING_PASSWORD ?? '')
    } catch (error) {
      return res.status(400).json(JSON.stringify({ error: 'Invalid word ID' }))
    }

    const assistantInstructions = `O(A) jogador(a) acabou de perder o jogo "Adivinhe a coisa". Anuncie a derrota dele(a),
    revele que a "coisa" secreta, que ele não adivinhou, era "${answer}", fale que você estará indisponível e só volta amanhã e que o(a)
    aguarda para jogar novamente. Dẽ personalidade à sua mensagem e maneire nos emojis.`

    const personality = assistants.find(
      (curr) => curr.name === assistant)?.personality

    const response = await instructAI(
      JSON.stringify(personality + ' ' + assistantInstructions) ?? '', 'gpt-3.5-turbo-0125')

    return res.status(200).json(JSON.stringify(response.choices[0].message.content))
  }

  async createUser (req: Request, res: Response): Promise<Response> {
    const { email, password, subscription } = req.body

    if (typeof email !== 'string' || (typeof password !== 'string' || typeof subscription !== 'string')) {
      throw new HTTPError(400, `email: ${typeof email}`)
    }

    await this.repository.createUser({ email, password, subscription })

    return res.status(200).json()
  }
}
