import { Model, INTEGER, STRING, DATE } from 'sequelize'
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
    type: STRING,
    field: 'first_name'
  },
  lastName: {
    allowNull: true,
    type: STRING,
    field: 'last_name'
  },
  email: {
    allowNull: false,
    type: STRING,
    unique: true
  },
  password: {
    allowNull: true,
    type: STRING
  },
  subscription: {
    allowNull: true,
    type: STRING,
    unique: true
  },
  profilePicPath: {
    allowNull: true,
    type: STRING,
    field: 'profile_pic_path'
  },
  createdAt: {
    allowNull: true,
    type: DATE,
    field: 'created_at'
  },
  updatedAt: {
    allowNull: true,
    type: DATE,
    field: 'updated_at'
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: true,
  modelName: 'users'
})

export default Users
