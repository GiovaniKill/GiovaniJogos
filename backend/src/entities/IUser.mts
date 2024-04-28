export default interface IUser {
  id: number
  firstName?: string
  lastName?: string
  email: string
  password?: string
  subscription?: string
  created_at?: Date
  updated_at?: Date
}
