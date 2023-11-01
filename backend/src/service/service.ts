import { Request, Response } from "express";

export default class Service {
    check(req: Request, res: Response) {
        const { word } = req.params;
        const answer = 'xadrez';

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

        let answerLetterCounter = countLetters(answer);

        let evaluation: ('right' | 'wrong' | 'moved')[] = [];

        for(let index = 0; index < answer.length; index++){
            if(word[index] === answer[index]){
                evaluation.push('right');
            } else if(Object.keys(answerLetterCounter).includes(word[index])){
                answerLetterCounter[word[index]] === 1 ? delete answerLetterCounter[word[index]] : answerLetterCounter[word[index]] -= 1;
                evaluation.push('moved');
            } else {
                evaluation.push('wrong');
            }
        }

        return res.status(200).json({evaluation});
    }
}