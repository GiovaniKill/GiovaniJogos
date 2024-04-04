import { OpenAI } from 'openai'
import type { ChatCompletion } from 'openai/resources'

const client = new OpenAI({
  organization: 'org-DUp3EHv0fsQo7k3BMgxtH906',
  apiKey: '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'
})

const AIRequest = async (question: string, instructions: string, thing: string): Promise<ChatCompletion> => {
  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: question },
      {
        role: 'system', content: `Não use a palavra "${thing}",
      não justifique suas respostas. Não dê informação não mencionada no contexto`
      }
    ],
    model: 'gpt-4-0125-preview'
  })

  console.log(response)

  return response
}

export { AIRequest }
