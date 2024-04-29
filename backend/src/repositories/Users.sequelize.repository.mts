import type IUser from '../entities/IUser.mjs'
import UsersModel from '../database/models/user.model.mjs'
import type IUsersRepository from './IUsers.repository.mjs'
import type ICreateUser from '../entities/ICreateUser.mjs'

export default class SequelizeUsers implements IUsersRepository {
  private readonly model = UsersModel

  async createUser (user: ICreateUser): Promise<IUser | undefined> {
    const response = await this.model.create({ ...user })
    return response
  }

  async findUserByEmailAndSubscription (email: string, subscription: string): Promise<IUser | null> {
    const response = await this.model.findOne({ where: { email, subscription } })
    return response
  }
}
