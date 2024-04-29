import type ILoginUser from '../entities/ILoginUser.mjs'
import type ICreateUser from '../entities/ICreateUser.mjs'
import type IUser from '../entities/IUser.mjs'

export default interface IUsersRepository {
  createUser: (user: ICreateUser) => Promise<IUser | undefined>
  findUserByEmailAndSubscription: (user: ILoginUser) => Promise<IUser | null>
}
