import type INewMessage from '../entities/INewMessage.mjs'
import type IMessage from '../entities/IMessage.mjs'

export default interface IMessagesRepository {
  createMessage: (newMessage: INewMessage) => Promise<IMessage>
  deleteAllConversationMessages: (userId: number, assistantId: number) => Promise<number>
  getLastMessagesByAssistant: (userId: number, assistantId: number, amount: number) => Promise<IMessage[] | null>
  getLastMessagesFromReference: (userId: number, assistantId: number, amount: number, createdAt: string) => Promise<IMessage[] | null>
  getFirstMessageByAssistant: (userId: number, assistantId: number) => Promise<IMessage | null>
}
