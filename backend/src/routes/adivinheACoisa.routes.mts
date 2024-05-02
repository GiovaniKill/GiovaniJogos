/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AdivinheACoisaService from '../service/adivinheACoisaService.mjs'
import SequelizeAssistants from '../repositories/Assistants.sequelize.repository.mjs'
import SequelizeUsers from '../repositories/Users.sequelize.repository.mjs'
import AdivinheACoisaController from '../controller/AdivinheACoisaController.mjs'
import tokenVerification from '../middlewares/TokenValidation.mjs'

const adivinheACoisaRouter = Router()
const usersRepository = new SequelizeUsers()
const assistantsRepository = new SequelizeAssistants()
const service = new AdivinheACoisaService(usersRepository, assistantsRepository)
const controller = new AdivinheACoisaController(service)

adivinheACoisaRouter.post('/ask', tokenVerification, async (req, res) => await controller.ask(req, res))
adivinheACoisaRouter.post('/getgameovermessage', tokenVerification, async (req, res) => await controller.getGameOverMessage(req, res))
adivinheACoisaRouter.get('/getassistants', async (req, res) => await controller.getAssistants(req, res))
adivinheACoisaRouter.get('/getsessioninfo', async (req, res) => await controller.getSessionInfo(req, res))

adivinheACoisaRouter.post('/googlelogin', async (req, res) => await controller.googleLogin(req, res))
adivinheACoisaRouter.post('/createuser', async (req, res) => await controller.createUser(req, res))
adivinheACoisaRouter.get('/validateandrenew', tokenVerification, async (req, res) => await controller.validateAndRenew(req, res))

export { adivinheACoisaRouter }
