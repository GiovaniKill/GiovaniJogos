import type IGameHistory from '../entities/IGameHistory.mjs'

export default interface IGamesHistoryRepository {
  getGame: (userId: number, answer: string, date: string) => Promise<IGameHistory | null>
  createGame: (userId: number, answer: string, date: string) => Promise<IGameHistory>
  decreaseTriesLeft: (userId: number, answer: string, date: string) => Promise<[affectedCount: number]>
  endGame: (userId: number, answer: string, date: string) => Promise<[affectedCount: number]>
}
