export default interface INewMessage {
  email: string
  message: string
  userId?: number
  assistantId: number
  createdAt?: string
  sender: string
}
