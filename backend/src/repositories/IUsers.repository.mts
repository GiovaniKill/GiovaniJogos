import type ICreateUser from '../entities/ICreateUser.mjs'
import type IUser from '../entities/IUser.mjs'

export default interface IUsersRepository {
  createUser: (user: ICreateUser) => Promise<IUser | undefined>
  findUserBySubscription: (subscription: string) => Promise<IUser | null>
  findUserByEmail: (email: string) => Promise<IUser | null>
}
