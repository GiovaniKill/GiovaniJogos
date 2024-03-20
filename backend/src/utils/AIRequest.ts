import { OpenAI } from 'openai'
import type { ChatCompletion } from 'openai/resources'

const client = new OpenAI({
  organization: 'org-DUp3EHv0fsQo7k3BMgxtH906',
  apiKey: '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'
})

const request = async (question: string): Promise<ChatCompletion> => {
  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: '' },
      { role: 'user', content: question }
    ],
    model: 'gpt-3.5-turbo'
  })

  return response
}

export { request }
