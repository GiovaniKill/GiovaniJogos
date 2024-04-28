import { Model, INTEGER, STRING, DATE, NOW } from 'sequelize'
// @ts-expect-error: Is not detecting type file before compilation
import db from './index.mjs'

class GamesHistory extends Model {
  declare userId: number
  declare triesLeft: number
  declare answer: string
  declare date: string
  declare status: string
}

GamesHistory.init({
  userId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    primaryKey: true,
    field: 'user_id'
  },
  triesLeft: {
    allowNull: false,
    type: INTEGER,
    defaultValue: 30,
    field: 'tries_left'
  },
  answer: {
    allowNull: false,
    type: STRING,
    primaryKey: true
  },
  date: {
    allowNull: false,
    type: DATE,
    defaultValue: NOW,
    primaryKey: true
  },
  status: {
    allowNull: false,
    type: STRING,
    defaultValue: 'unfinished'
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
  modelName: 'games-history'
})

export default GamesHistory
