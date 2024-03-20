import { Router } from 'express'
import Service from '../service/adivinheACoisaService'

const adivinheACoisaRouter = Router()
const service = new Service()

adivinheACoisaRouter.post('/ask', (req, res) => service.ask(req, res))

export { adivinheACoisaRouter }
