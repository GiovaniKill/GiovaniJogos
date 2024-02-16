import { Router } from 'express'
import Service from '../service/service.ts'

const router = Router()
const service = new Service()

router.get('/check/:word', (req, res) => service.check(req, res))

export { router }
