import type IGamesHistoryRepository from './IGamesHistory.repository.mjs'
import GamesHistoryModel from '../database/models/gameHistory.model.mjs'
import type IGameHistory from '../entities/IGameHistory.mjs'
import sequelize from 'sequelize'

export default class GamesHistoryRepository implements IGamesHistoryRepository {
  private readonly model = GamesHistoryModel

  async getGame (userId: number, answer: string, date: string): Promise<IGameHistory | null> {
    const response = await this.model.findOne({
      where: { userId, answer, date },
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'answer'] },
      raw: true
    })
    return response
  }

  async createGame (userId: number, answer: string, date: string): Promise<IGameHistory> {
    const newGame = await this.model.create({ userId, answer, date })
    return newGame
  }

  async decreaseTriesLeft (userId: number, answer: string, date: string): Promise<[affectedCount: number]> {
    const response = await this.model.update(
      { triesLeft: sequelize.literal('CASE WHEN tries_left > 0 THEN tries_left - 1 ELSE 0 END') },
      { where: { userId, answer, date } })
    return response
  }

  async endGame (userId: number, answer: string, date: string): Promise<[affectedCount: number]> {
    const response = await this.model.update(
      { status: 'finished' },
      { where: { userId, answer, date } })
    return response
  }

  async getAllGamesByUser (userId: number): Promise<IGameHistory[]> {
    const response = await this.model.findAll(
      {
        where: { userId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'answer'] },
        raw: true
      })
    return response
  }
}
