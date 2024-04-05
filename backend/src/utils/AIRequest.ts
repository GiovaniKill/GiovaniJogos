import { OpenAI } from 'openai'
import type { ChatCompletion } from 'openai/resources'
import 'dotenv/config'

const client = new OpenAI({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY
})

const AIRequest = async (question: string, instructions: string, thing: string, model: string): Promise<ChatCompletion> => {
  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: question },
      {
        role: 'system', content: `Não use a palavra "${thing}",
      não justifique suas respostas. Não dê informação não mencionada no contexto`
      }
    ],
    model
  })

  console.log(response)

  return response
}

export { AIRequest }
