import { Request, Response } from "express";
import answers from './answers'

export default class Service {
    check(req: Request, res: Response) {
        let { word } = req.params;
        const date = new Date()
        const answer = answers[Math.floor((date.getTime() / 86400000) % answers.length)];

        //Removing accents from the answer and the guess word
        const normalizedAnswer = answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if(word.length !== answer.length){
            return res.status(400).json({ message: 'Word length is wrong' });
        }

        const countLetters = (wordToCount: string) => {
            const counter: { [key: string]: number; } = {};

            wordToCount.split('').forEach(letter => {
                counter[letter] ? counter[letter] += 1 : counter[letter] = 1;
            });

            return counter;
        }

        let answerLetterCounter = countLetters(normalizedAnswer);
        
        let evaluation: ('right' | 'wrong' | 'moved')[] = [];

        for(let index = 0; index < answer.length; index++){
            if(word[index] === normalizedAnswer[index] && answerLetterCounter[word[index]]){
                answerLetterCounter[word[index]] -= 1;
                evaluation.push('right');
            } else if(Object.keys(answerLetterCounter).includes(word[index]) && answerLetterCounter[word[index]]){
                answerLetterCounter[word[index]] -= 1;
                evaluation.push('moved');
            } else {
                evaluation.push('wrong');
            }
        }

        if(evaluation.every((elem) => elem === 'right')){
            return res.status(200).json({evaluation, accentuatedAnswer: answer});
        } else {
            return res.status(200).json({evaluation, accentuatedAnswer: ''});
        }
    }
}