import { Model, INTEGER, STRING, DATE, TEXT } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from '../../../src/database/models/index.mjs'

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
    type: TEXT('medium')
  },
  userId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'user_id'
  },
  assistantId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'assistants',
      key: 'id'
    },
    field: 'assistant_id'
  },
  role: {
    allowNull: false,
    type: STRING
  },
  createdAt: {
    primaryKey: true,
    type: DATE(3),
    field: 'created_at'
  },
  updatedAt: {
    allowNull: true,
    type: DATE(3),
    field: 'updated_at'
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: true,
  modelName: 'messages'
})

export default Messages
