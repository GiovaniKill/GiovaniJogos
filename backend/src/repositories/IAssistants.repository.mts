import type IAssistant from '../entities/IAssistant.mjs'

export default interface IAssistantsRepository {
  getAssistants: () => Promise<IAssistant[] | null>
  getAssistant: (assistantId: number) => Promise<IAssistant | null>
}
