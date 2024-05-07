import 'dotenv/config'
import { askAI, instructAI } from '../utils/AIRequest.mjs'
import { assistants, type responseAssistant } from '../data/adivinheACoisa/assistants.mjs'
import * as fs from 'fs'
import { IDToWord, wordToID } from '../utils/handleID.mjs'
import answers from '../data/adivinheACoisa/answers.mjs'
import type IUsersRepository from '../repositories/IUsers.repository.mjs'
import HTTPError from '../utils/HTTPError.mjs'
import type ICreateUser from '../entities/ICreateUser.mjs'
import type IUser from '../entities/IUser.mjs'
import type IAskParams from '../entities/IAskParams.mjs'
import type IResponseAssistant from '../entities/IResponseAssistant.mjs'
import type IAssistantsRepository from '../repositories/IAssistants.repository.mjs'
import { createToken, decodeToken } from '../utils/TokenManager.mjs'
import type IGameOverMessageParams from '../entities/IGameOverMessageParams.mjs'
import type IGamesHistoryRepository from '../repositories/IGamesHistory.repository.mjs'
import type IGameHistory from '../entities/IGameHistory.mjs'

export default class AdivinheACoisaService {
  private readonly usersRepository: IUsersRepository
  private readonly assistantsRepository: IAssistantsRepository
  private readonly gamesHistoryRepository: IGamesHistoryRepository

  constructor (usersRepository: IUsersRepository, assistantsRepository: IAssistantsRepository, gamesHistoryRepository: IGamesHistoryRepository) {
    this.usersRepository = usersRepository
    this.assistantsRepository = assistantsRepository
    this.gamesHistoryRepository = gamesHistoryRepository
  }

  async googleLogin (googleJWT: string): Promise<string> {
    const { email, sub: subscription, picture, email_verified: emailVerified } = decodeToken(googleJWT).payload

    if (emailVerified === false) {
      throw new HTTPError(403, 'User not verified')
    }

    const response = await this.usersRepository.findUserByEmailAndSubscription({ email, subscription })

    if (response === null) {
      await this.createUser({ email, subscription, picture })
    }

    const token = await this.generateToken(email as string)

    return token
  }

  async generateToken (email: string): Promise<string> {
    const date = new Date()
    const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)]
    const normalizedAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const payload = {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(),
      year: date.getFullYear().toString(),
      wordID: wordToID(normalizedAnswer, process.env.THING_PASSWORD ?? '')
    }

    const token = createToken({ email, ...payload })

    return token
  }

  async ask (params: IAskParams): Promise<string | null> {
    const { question, wordID, assistant, date, email } = params
    const answer = await this.getWordId(wordID)

    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    // C
    await this.getOrCreateGame(email, answer, date)

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

    await this.gamesHistoryRepository.decreaseTriesLeft(user.id, answer, date)

    return response.choices[0].message.content
  }

  async getAssistants (): Promise<IResponseAssistant[] | undefined> {
    const assistants = await this.assistantsRepository.getAssistants()

    const response = assistants?.map((curr) => {
      const { personality, profilePicPath, ...rest } = curr
      const image = fs.readFileSync(profilePicPath)
      const base64Image = Buffer.from(image).toString('base64')
      const newObj: responseAssistant = {
        ...rest,
        profilePic: base64Image
      }
      return newObj
    })

    return response
  }

  async getGameOverMessage (params: IGameOverMessageParams): Promise<string | null> {
    const { wordID, assistant } = params

    const answer = await this.getWordId(wordID)

    const assistantInstructions = `O(A) jogador(a) acabou de perder o jogo "Adivinhe a coisa". Anuncie a derrota dele(a),
    revele que a "coisa" secreta, que ele não adivinhou, era "${answer}", fale que você estará indisponível e só volta amanhã e que o(a)
    aguarda para jogar novamente. Dẽ personalidade à sua mensagem e maneire nos emojis.`

    const personality = assistants.find(
      (curr) => curr.name === assistant)?.personality

    const response = await instructAI(
      JSON.stringify(personality + ' ' + assistantInstructions) ?? '', 'gpt-3.5-turbo-0125')

    return response.choices[0].message.content
  }

  async createUser (newUser: ICreateUser): Promise<IUser> {
    const { email, subscription } = newUser
    const user = await this.usersRepository.findUserByEmailAndSubscription({ email, subscription })

    if (user !== null) {
      throw new HTTPError(409, 'User already exists')
    }

    const result = await this.usersRepository.createUser(newUser)

    if (result instanceof Error || typeof result === 'undefined') {
      throw new HTTPError(500, 'Internal Error')
    }

    return result
  }

  async getOrCreateGame (emailOrId: string | number, answer: string, date: string): Promise<IGameHistory> {
    if (typeof emailOrId === 'string') {
      const user = await this.usersRepository.findUserByEmail(emailOrId)

      if (user === null) {
        throw new HTTPError(404, 'User not found')
      }

      emailOrId = user.id
    }

    const history = await this.gamesHistoryRepository.getGame(emailOrId, answer, date)

    if (history === null) {
      const newGame = await this.gamesHistoryRepository.createGame(emailOrId, answer, date)
      const { triesLeft, status } = newGame
      return { triesLeft, date, status }
    }

    if (history.triesLeft === 0 || history.status === 'finished') {
      throw new HTTPError(403, 'This game is finished')
    }

    return history
  }

  async decreaseTriesLeft (email: string, wordID: string, date: string): Promise<[affectedCount: number]> {
    const answer = await this.getWordId(wordID)

    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    // Validates tries left
    await this.getOrCreateGame(user.id, answer, date)

    const affectedRows = await this.gamesHistoryRepository.decreaseTriesLeft(user.id, answer, date)

    if (affectedRows[0] === 0) {
      throw new HTTPError(400, 'Error changing the number of tries left')
    }

    return affectedRows
  }

  async getWordId (wordID: string): Promise<string> {
    const treatedWordID = wordID.replace('"', '')
    let answer = ''

    try {
      answer = IDToWord(treatedWordID, process.env.THING_PASSWORD ?? '')
    } catch (error) {
      throw new HTTPError(400, 'Malformed request')
    }

    return answer
  }
}
