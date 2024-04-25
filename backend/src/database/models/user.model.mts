import { Model, INTEGER, STRING } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from './index.mjs'

class Users extends Model {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare password: string
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
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'users'
})

export default Users
