import 'dotenv/config'
import { askAI, instructAI } from '../utils/AIRequest.mjs'
import { type responseAssistant } from '../data/adivinheACoisa/assistants.mjs'
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
import type IGameOverParams from '../entities/IGameOverParams.mjs'
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
    const {
      email, sub: subscription, picture, email_verified: emailVerified,
      given_name: firstName, family_name: lastName
    } = decodeToken(googleJWT).payload

    if (typeof email !== 'string' || typeof subscription !== 'string') {
      throw new HTTPError(400, 'Malformed request')
    }

    if (emailVerified !== true) {
      throw new HTTPError(403, 'User not verified by Google')
    }

    const response = await this.usersRepository.findUserBySubscription(subscription)

    if (response === null) {
      await this.createUser({ email, subscription, picture, firstName, lastName })
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

    const token = createToken({ email, ...payload }, 2)

    return token
  }

  async getWelcomeMessage (email: string, assistantId: number): Promise<IMessage> {
    const assistant = await this.assistantsRepository.getAssistant(assistantId)
    if (assistant === null) {
      throw new HTTPError(404, 'Assistant not found')
    }

    const user = await this.usersRepository.findUserByEmail(email)
    if (user === null) {
      throw new HTTPError(404, 'Assistant not found')
    }

    const priorGames = await this.gamesHistoryRepository.getAllGamesByUser(user?.id)

    const isFirstTime = priorGames.length <= 1

    const instructions = `O jogador(a) ${typeof user?.firstName === 'string' && `de nome ${user?.firstName}`} acaba de entrar no jogo \
    "Adivinhe a coisa", dê suas boas vindas casuais de acordo com sua personalidade.
    ${isFirstTime
      ? `Esse é a primeira vez que ele(a) joga o jogo, descreva como jogar. O jogo é de perguntas
      e respostas. O jogador deve te fazer uma pergunta que pode ser respondida com 'sim' ou 'não'
      para adivinhar uma 'coisa' secreta, que é uma palavra que muda diariamente.`
      : 'O(A) jogador(a) já jogou outras vezes, o(a) receba como um conhecido(a)'}
      Não se estenda muito. Também informe que seus outros colegas estão disponíveis para ajudá-lo(la),
      e que a única diferença entre vocês é suas personalidades.`

    const response = await instructAI(assistant.personality + ' ' + instructions, 'gpt-4o')

    const assistantMessage = await this.createMessage(
      { email, message: response.choices[0].message.content ?? '', assistantId, role: 'assistant' })

    return assistantMessage
  }

  async ask (params: IAskParams): Promise<{ message: IMessage, foundTheAnswer: boolean }> {
    const { question, wordId, assistantId, date, email } = params
    const answer = await this.getWordId(wordId)

    const user = await this.usersRepository.findUserByEmail(email)
    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const assistant = await this.assistantsRepository.getAssistant(assistantId)
    if (assistant === null) {
      throw new HTTPError(404, 'Assistant not found')
    }

    // Also checks number of tries left
    await this.getOrCreateGame(email, wordId, date)

    const accentuatedAnswer = answers.find((curr) => curr.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === answer)

    if (accentuatedAnswer === undefined) {
      throw new HTTPError(404, 'Answer not found')
    }

    let message: IMessage

    await this.gamesHistoryRepository.decreaseTriesLeft(user.id, answer, date)

    const foundTheAnswer = question.includes(accentuatedAnswer) || question.includes(answer)

    if (foundTheAnswer) {
      message = await this.getGameOverMessage(
        { email, wordId, assistantId, result: 'victory' })

      await this.gamesHistoryRepository.endGame(user.id, answer, date)
    } else {
      const assistantInstructions = `O(A) jogador(a) \
      ${typeof user?.firstName === 'string' && `de nome ${user?.firstName}`}
      te fará perguntas de sim
      ou não com o objetivo de encontrar uma "coisa" secreta, que hoje é "${accentuatedAnswer}".
      Responda com respostas simples como "Sim", "Não", "Também", "Provavelmente sim",
      "Provavelmente não", "Pode ser", "Em partes, sim", "Essa pergunta não pode ser respondida com sim ou não",
      "Não sei responder" ou "Depende de [alguma coisa que você queira completar]". Nunca revele demais sobre a
      "coisa", ela é secreta. Sempre adicione personalidade às suas respostas e use emojis com moderação, mas seja breve.
      O(A) jogador(a) pode se referir a você como a "coisa", perguntando, por exemplo, "Você é de madeira?".
      A "coisa" que ele deverá acertar é "${accentuatedAnswer}".
      Não dê dicas ou converse sobre outros assuntos. Nunca mencione a palavra "${accentuatedAnswer}" ou use emojis que
      representem "${accentuatedAnswer}". O(a) jogador(a) te fará várias perguntas, mas você só terá acesso à ultima mensagem
      dele(a). Caso requisitado, auxilie o jogador ensinando como jogar o jogo.`

      const response = await askAI(
        JSON.stringify(question),
        JSON.stringify(assistant?.personality + ' ' + assistantInstructions) ?? '',
        answer, 'gpt-4o')
      message = await this.createMessage(
        { email, message: response.choices[0].message.content ?? '', assistantId, role: 'assistant' })
    }

    return { message, foundTheAnswer }
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

  async getGameOverMessage (params: IGameOverParams): Promise<IMessage> {
    const { wordId, assistantId, email, result } = params

    const answer = await this.getWordId(wordId)
    const user = await this.usersRepository.findUserByEmail(email)

    const victoryInstructions = `O(A) jogador(a) acaba de acertar a resposta, que era
    "${answer}" depois de te fazer várias perguntas. O(A) parabenize.`

    const defeatInstructions = `O(A) jogador(a) acabou de perder o jogo "Adivinhe a coisa" depois
    de te fazer várias perguntas. Anuncie a derrota dele(a), revele que a "coisa" secreta,
    que ele não adivinhou, era "${answer}"`

    let assistantInstructions = `Fale que você estará indisponível e só volta amanhã e que o(a)
    aguarda para jogar novamente. Dê personalidade à sua mensagem e maneire nos emojis. 
    ${typeof user?.firstName === 'string' && `O nome do(a) jogador(a) é ${user?.firstName}`}`

    if (result === 'victory') {
      assistantInstructions = victoryInstructions + ' ' + assistantInstructions
    } else {
      assistantInstructions = defeatInstructions + ' ' + assistantInstructions
    }

    const assistant = await this.assistantsRepository.getAssistant(assistantId)

    const response = await instructAI(
      JSON.stringify(assistant?.personality + ' ' + assistantInstructions) ?? '', 'gpt-4o')

    const message = await this.createMessage({ email, message: response.choices[0].message.content ?? '', assistantId, role: 'assistant' })

    return message
  }

  async endGame (email: string, wordId: string, date: string): Promise<[affectedCount: number]> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const answer = await this.getWordId(wordId)

    const affectedRows = await this.gamesHistoryRepository.endGame(user.id, answer, date)

    return affectedRows
  }

  async createUser (newUser: ICreateUser): Promise<IUser> {
    const { subscription } = newUser
    const user = await this.usersRepository.findUserBySubscription(subscription)

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
      return { triesLeft, date, status, newGame: true }
    }

    const { triesLeft, status } = history

    return { triesLeft, status, newGame: false }
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

  async getAllLastMessages (email: string, amount: number): Promise<IMessage[] | null> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const assistants = await this.assistantsRepository.getAssistants()
    if (assistants === null) throw new HTTPError(404, 'No assistant found')

    let messages: IMessage[] = []

    for (let i = 0; i < assistants.length; i++) {
      const assistant = assistants[i]
      const result = await this.messagesRepository.getLastMessagesByAssistant(user.id, assistant.id, amount)
      const firstMessage = await this.messagesRepository.getFirstMessageByAssistant(user.id, assistant.id)
      if (result !== null && result.length > 0) {
        result.reverse()
        if (new Date(result[0]?.createdAt ?? '').getTime() ===
        new Date(firstMessage?.createdAt ?? '').getTime()) result[0].firstMessage = true
        messages = [...messages, ...result]
      }
    }

    return messages
  }

  async getLastMessagesFromReference (email: string, assistantId: number,
    amount: number, createdAt: string): Promise<IMessage[] | null> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user === null) {
      throw new HTTPError(404, 'User not found')
    }

    const messages = await this.messagesRepository
      .getLastMessagesFromReference(user.id, assistantId, amount, createdAt)
    if (messages === null || messages.length === 0) return null
    messages.reverse()

    const firstMessage = await this.messagesRepository.getFirstMessageByAssistant(user.id, assistantId)

    if (new Date(messages[0].createdAt ?? '').getTime() ===
    new Date(firstMessage?.createdAt ?? '').getTime()) {
      messages[0].firstMessage = true
    }

    return messages
  }
}
