import { Model, INTEGER, STRING, DATE } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from '../../../src/database/models/index.mjs'

class Assistants extends Model {
  declare id: number
  declare name: string
  declare personality: string
  declare profilePicPath: string
  declare description: string
}

Assistants.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER
  },
  name: {
    allowNull: false,
    type: STRING,
    unique: true
  },
  personality: {
    allowNull: false,
    type: STRING
  },
  profilePicPath: {
    allowNull: false,
    type: STRING,
    field: 'profile_pic_path'
  },
  description: {
    allowNull: false,
    type: STRING
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
  modelName: 'assistants'
})

export default Assistants
