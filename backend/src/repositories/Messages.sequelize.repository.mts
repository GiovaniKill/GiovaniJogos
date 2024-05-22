import type IMessagesRepository from './IMessages.repository.mjs'
import MessagesModel from '../database/models/message.model.mjs'
import type IMessage from '../entities/IMessage.mjs'
import type INewMessage from '../entities/INewMessage.mjs'
import { Op } from 'sequelize'

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

  async getLastMessagesByAssistant (userId: number, assistantId: number, amount: number): Promise<IMessage[] | null> {
    const response = await this.model.findAll(
      {
        where: {
          userId,
          assistantId
        },
        limit: amount,
        order: [['id', 'DESC']],
        attributes: { exclude: ['id', 'userId', 'updatedAt'] },
        raw: true
      }
    )
    return response
  }

  async getLastMessagesFromReference (userId: number, assistantId: number,
    amount: number, createdAt: string): Promise<IMessage[] | null> {
    const response = await this.model.findAll(
      {
        where: {
          userId,
          assistantId,
          createdAt: { [Op.lt]: createdAt }
        },
        order: [['id', 'DESC']],
        raw: true,
        limit: amount,
        attributes: { exclude: ['id, userId, updatedAt'] }
      }
    )
    return response
  }

  async getFirstMessageByAssistant (userId: number, assistantId: number): Promise<IMessage | null> {
    const response = await this.model.findOne(
      {
        where: {
          userId,
          assistantId
        },
        order: [['createdAt', 'ASC']],
        limit: 1,
        attributes: { exclude: ['id', 'userId', 'updatedAt'] },
        raw: true
      }
    )
    return response
  }
}
