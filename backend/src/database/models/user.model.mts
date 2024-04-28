import { Model, INTEGER, STRING } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from '../../../src/database/models/index.mjs'

class Users extends Model {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare password: string
  declare subscription: string
}

Users.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER
  },
  firstName: {
    allowNull: true,
    type: STRING
  },
  lastName: {
    allowNull: true,
    type: STRING
  },
  email: {
    allowNull: false,
    type: STRING
  },
  password: {
    allowNull: true,
    type: STRING
  },
  subscription: {
    allowNull: true,
    type: STRING
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: true,
  modelName: 'users'
})

export default Users
