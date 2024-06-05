/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import PalavrouService from '../service/palavrouService.mjs'
import PalavrouController from '../controller/palavrouController.mjs'
import palavrouValidation from '../middlewares/palavrouValidation.mjs'

const palavrouRouter = Router()
const service = new PalavrouService()
const controller = new PalavrouController(service)

palavrouRouter.get('/check/:word', palavrouValidation, async (req, res) => await controller.check(req, res))
palavrouRouter.get('/gettoken', async (req, res) => await controller.getToken(req, res))
palavrouRouter.get('/getanswer', palavrouValidation, async (req, res) => await controller.getAnswer(req, res))

export { palavrouRouter }
