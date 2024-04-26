import { Model, INTEGER, STRING } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from './index.mjs'

class Messages extends Model {
  declare id: number
  declare message: string
  declare userId: number
  declare assistantId: number
}

Messages.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER
  },
  message: {
    allowNull: false,
    type: STRING
  },
  userId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  assistantId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'assistants',
      key: 'id'
    }
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: true,
  modelName: 'messages'
})

export default Messages
