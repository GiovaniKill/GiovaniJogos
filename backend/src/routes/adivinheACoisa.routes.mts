/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AdivinheACoisaService from '../service/adivinheACoisaService.mjs'
import SequelizeUsers from '../repositories/Users.sequelize.repository.mjs'
import AdivinheACoisaController from '../controller/AdivinheACoisaController.mjs'
import tokenVerification from '../utils/TokenValidation.mjs'

const adivinheACoisaRouter = Router()
const usersRepository = new SequelizeUsers()
const service = new AdivinheACoisaService(usersRepository)
const controller = new AdivinheACoisaController(service)

adivinheACoisaRouter.post('/ask', tokenVerification, async (req, res) => await controller.ask(req, res))
adivinheACoisaRouter.post('/getgameovermessage', tokenVerification, async (req, res) => await controller.getGameOverMessage(req, res))
adivinheACoisaRouter.get('/getassistants', async (req, res) => await controller.getAssistants(req, res))

adivinheACoisaRouter.post('/login', async (req, res) => await controller.login(req, res))
adivinheACoisaRouter.post('/createuser', async (req, res) => await controller.createUser(req, res))

export { adivinheACoisaRouter }
