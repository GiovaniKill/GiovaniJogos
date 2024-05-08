/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AdivinheACoisaService from '../service/adivinheACoisaService.mjs'
import SequelizeAssistants from '../repositories/Assistants.sequelize.repository.mjs'
import SequelizeUsers from '../repositories/Users.sequelize.repository.mjs'
import SequelizeGamesHistory from '../repositories/GamesHistory.sequelize.repository.mjs'
import AdivinheACoisaController from '../controller/AdivinheACoisaController.mjs'
import tokenVerification from '../middlewares/TokenValidation.mjs'
import SequelizeMessages from '../repositories/Messages.sequelize.repository.mjs'

const adivinheACoisaRouter = Router()
const usersRepository = new SequelizeUsers()
const assistantsRepository = new SequelizeAssistants()
const gamesHistoryRepository = new SequelizeGamesHistory()
const messagesRepository = new SequelizeMessages()
const service = new AdivinheACoisaService(usersRepository, assistantsRepository, gamesHistoryRepository, messagesRepository)
const controller = new AdivinheACoisaController(service)

adivinheACoisaRouter.post('/ask', tokenVerification, async (req, res) => await controller.ask(req, res))
adivinheACoisaRouter.post('/createmessage', tokenVerification, async (req, res) => await controller.createMessage(req, res))
adivinheACoisaRouter.delete('/deleteconversation', tokenVerification, async (req, res) => await controller.deleteAllConversationMessages(req, res))
adivinheACoisaRouter.post('/getgameovermessage', tokenVerification, async (req, res) => await controller.getGameOverMessage(req, res))
adivinheACoisaRouter.get('/getassistants', async (req, res) => await controller.getAssistants(req, res))
adivinheACoisaRouter.get('/getgame', tokenVerification, async (req, res) => await controller.getGame(req, res))
adivinheACoisaRouter.put('/decreasetriesleft', tokenVerification, async (req, res) => await controller.decreaseTriesLeft(req, res))

adivinheACoisaRouter.post('/googlelogin', async (req, res) => await controller.googleLogin(req, res))
adivinheACoisaRouter.post('/createuser', async (req, res) => await controller.createUser(req, res))
adivinheACoisaRouter.get('/validateandrenew', tokenVerification, async (req, res) => await controller.validateAndRenew(req, res))

export { adivinheACoisaRouter }
