/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import Service from '../service/adivinheACoisaService'

const adivinheACoisaRouter = Router()
const service = new Service()

adivinheACoisaRouter.post('/ask', async (req, res) => await service.ask(req, res))

export { adivinheACoisaRouter }
