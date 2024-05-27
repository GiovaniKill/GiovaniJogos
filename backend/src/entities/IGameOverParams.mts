export default interface IGameOverMessageParams {
  wordId: string
  assistantId: number
  email: string
  result: 'victory' | 'defeat'
}
