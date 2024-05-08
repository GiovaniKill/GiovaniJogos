import type IMessagesRepository from './IMessages.repository.mjs'
import MessagesModel from '../database/models/message.model.mjs'
import type IMessage from '../entities/IMessage.mjs'
import type INewMessage from '../entities/INewMessage.mjs'

export default class SequelizeMessages implements IMessagesRepository {
  private readonly model = MessagesModel
  async createMessage (newMessage: INewMessage): Promise<IMessage> {
    const response = await this.model.create({ ...newMessage })
    return response
  }

  async deleteAllConversationMessages (userId: number, assistantId: number): Promise<number> {
    const response = await this.model.destroy({ where: { userId, assistantId } })
    return response
  }
}
