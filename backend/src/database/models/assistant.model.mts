import { Model, INTEGER, STRING } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from './index.mjs'

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
    type: STRING
  },
  personality: {
    allowNull: false,
    type: STRING
  },
  profilePicPath: {
    allowNull: false,
    type: STRING
  },
  description: {
    allowNull: false,
    type: STRING
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: true,
  modelName: 'assistants'
})

export default Assistants
