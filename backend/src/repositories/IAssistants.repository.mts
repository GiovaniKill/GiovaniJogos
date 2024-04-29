import type IAssistant from '../entities/IAssistant.mjs'

export default interface IAssistantsRepository {
  getAssistants: () => Promise<IAssistant[] | undefined>
}
