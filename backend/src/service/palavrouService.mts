import answers from '../data/palavrou/answers.mjs'
import { createToken } from '../utils/TokenManager.mjs'

export default class PalavrouService {
  check (word: string, year: number, month: number, day: number): Record<string, unknown> {
    const date = new Date(year, month, day)
    const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)]

    // Removing accents from the answer and the guess word
    const normalizedAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const countLetters = (wordToCount: string): Record<string, number> => {
      const counter: Record<string, number> = {}

      wordToCount.split('').forEach(letter => {
        counter[letter] !== undefined ? counter[letter] += 1 : counter[letter] = 1
      })

      return counter
    }

    const answerLetterCounter = countLetters(normalizedAnswer)

    const evaluation: Array<'right' | 'wrong' | 'moved'> = []

    // First finds the right and wrong letters, then finds the moved ones
    for (let index = 0; index < answer.length; index++) {
      if (word[index] === normalizedAnswer[index] && answerLetterCounter[word[index]] !== 0) {
        answerLetterCounter[word[index]] -= 1
        evaluation.push('right')
      } else {
        evaluation.push('wrong')
      }
    }

    for (let index = 0; index < answer.length; index++) {
      if (Object.keys(answerLetterCounter).includes(word[index]) &&
      answerLetterCounter[word[index]] !== 0 && evaluation[index] !== 'right') {
        answerLetterCounter[word[index]] -= 1
        evaluation[index] = 'moved'
      }
    }

    if (evaluation.every((elem) => elem === 'right')) {
      return { evaluation, accentuatedAnswer: answer }
    } else {
      return { evaluation, accentuatedAnswer: '' }
    }
  }

  getAnswer (year: number, month: number, day: number): string {
    const date = new Date(year, month, day)

    return answers[Math.floor((date.getTime() / 86400000) % answers.length)]
  }

  async getToken (): Promise<string> {
    const date = new Date()

    const payload = {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(),
      year: date.getFullYear().toString()
    }

    const token = createToken(payload, 2)

    return token
  }
}
