import type IAssistant from '../entities/IAssistant.mjs'
import type IAssistantsRepository from './IAssistants.repository.mjs'
import AssistantsModel from '../database/models/assistant.model.mjs'

export default class AssistantsRepository implements IAssistantsRepository {
  private readonly model = AssistantsModel

  async getAssistants (): Promise<IAssistant[] | null> {
    const response = await this.model.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true })
    return response
  }

  async getAssistant (assistantId: number): Promise<IAssistant | null> {
    const response = await this.model.findOne({
      where: { id: assistantId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true
    })
    return response
  }
}
