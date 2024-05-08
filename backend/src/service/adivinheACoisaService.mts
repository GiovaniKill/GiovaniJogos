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
import { createToken, decodeToken } from '../utils/TokenManager.mjs'
import type IAssistantsRepository from '../repositories/IAssistants.repository.mjs'
import type IGameOverMessageParams from '../entities/IGameOverMessageParams.mjs'
import type IGamesHistoryRepository from '../repositories/IGamesHistory.repository.mjs'
import type IGameHistory from '../entities/IGameHistory.mjs'
import type IMessage from '../entities/IMessage.mjs'
import type IMessagesRepository from '../repositories/IMessages.repository.mjs'
import type INewMessage from '../entities/INewMessage.mjs'

export default class AdivinheACoisaService {
  private readonly usersRepository: IUsersRepository
  private readonly assistantsRepository: IAssistantsRepository
  private readonly gamesHistoryRepository: IGamesHistoryRepository
  private readonly messagesRepository: IMessagesRepository

  constructor (usersRepository: IUsersRepository, assistantsRepository: IAssistantsRepository,
    gamesHistoryRepository: IGamesHistoryRepository, messagesRepository: IMessagesRepository) {
    this.usersRepository = usersRepository
    this.assistantsRepository = assistantsRepository
    this.gamesHistoryRepository = gamesHistoryRepository
    this.messagesRepository = messagesRepository
  }

  async googleLogin (googleJWT: string): Promise<string> {
    const { email, sub: subscription, picture, email_verified: emailVerified } = decodeToken(googleJWT).payload

    if (typeof email !== 'string' || typeof subscription !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    if (emailVerified !== true) {
      throw new HTTPError(403, 'User not verified by Google')
    }

    const response = await this.usersRepository.findUserByEmailAndSubscription({ email, subscription })

    if (response === null) {
      await this.createUser({ email, subscription, picture })
    }

    const token = await this.generateToken(email)

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
      wordId: wordToID(normalizedAnswer, process.env.THING_PASSWORD ?? '')
    }

    const token = createToken({ email, ...payload })

    return token
  }

  async ask (params: IAskParams): Promise<string | null> {
    const { question, wordId, assistant, date, email } = params
    const answer = await this.getWordId(wordId)

    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    // Also checks number of tries left
    await this.getOrCreateGame(email, wordId, date)

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
    const { wordId, assistant } = params

    const answer = await this.getWordId(wordId)

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

  async getOrCreateGame (emailOrId: string | number, wordId: string, date: string): Promise<IGameHistory> {
    if (typeof emailOrId === 'string') {
      const user = await this.usersRepository.findUserByEmail(emailOrId)

      if (user === null) {
        throw new HTTPError(404, 'User not found')
      }

      emailOrId = user.id
    }

    const answer = await this.getWordId(wordId)

    const history = await this.gamesHistoryRepository.getGame(emailOrId, answer, date)

    if (history === null) {
      const newGame = await this.gamesHistoryRepository.createGame(emailOrId, answer, date)
      const { triesLeft, status } = newGame
      return { triesLeft, date, status }
    }

    if (history.triesLeft === 0 || history.status === 'finished') {
      throw new HTTPError(403, 'This game is finished')
    }

    const { triesLeft, status } = history

    return { triesLeft, status }
  }

  async decreaseTriesLeft (email: string, wordId: string, date: string): Promise<[affectedCount: number]> {
    const answer = await this.getWordId(wordId)

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

  async getWordId (wordId: string): Promise<string> {
    const treatedWordId = wordId.replace('"', '')
    let answer = ''

    try {
      answer = IDToWord(treatedWordId, process.env.THING_PASSWORD ?? '')
    } catch (error) {
      throw new HTTPError(400, 'Malformed request')
    }

    return answer
  }

  async createMessage (newMessage: INewMessage): Promise<IMessage> {
    const user = await this.usersRepository.findUserByEmail(newMessage.email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const response = await this.messagesRepository.createMessage({ ...newMessage, userId: user.id })
    return response
  }

  async deleteAllConversationMessages (email: string, assistantId: number): Promise<number> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const deletedRows = await this.messagesRepository.deleteAllConversationMessages(user.id, assistantId)

    return deletedRows
  }
}
