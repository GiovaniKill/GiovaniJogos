import { type Request, type Response } from 'express'
import answers from '../data/palavrou/answers.js'

export default class Service {
  check (req: Request, res: Response): Response {
    let { word } = req.params
    const date = new Date()
    const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)]

    // Removing accents from the answer and the guess word
    const normalizedAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    if (word.length !== answer.length) {
      return res.status(400).json({ message: 'Word length is wrong' })
    }

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
      return res.status(200).json({ evaluation, accentuatedAnswer: answer })
    } else {
      return res.status(200).json({ evaluation, accentuatedAnswer: '' })
    }
  }
}
