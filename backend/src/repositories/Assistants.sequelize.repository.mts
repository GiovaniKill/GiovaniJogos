import type IAssistant from '../entities/IAssistant.mjs'
import type IAssistantsRepository from './IAssistants.repository.mjs'
import AssistantsModel from '../database/models/assistant.model.mjs'

export default class AssistantsRepository implements IAssistantsRepository {
  private readonly model = AssistantsModel

  async getAssistants (): Promise<IAssistant[] | undefined> {
    const response = await this.model.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }, raw: true })
    return response
  }
}
