import { Router } from 'express'
import Service from '../service/palavrouService'

const palavrouRouter = Router()
const service = new Service()

palavrouRouter.get('/check/:word', (req, res) => service.check(req, res))

export { palavrouRouter }
