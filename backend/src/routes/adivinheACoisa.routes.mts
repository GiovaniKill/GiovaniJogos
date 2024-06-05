/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AdivinheACoisaService from '../service/adivinheACoisaService.mjs'
import SequelizeAssistants from '../repositories/Assistants.sequelize.repository.mjs'
import SequelizeUsers from '../repositories/Users.sequelize.repository.mjs'
import SequelizeGamesHistory from '../repositories/GamesHistory.sequelize.repository.mjs'
import AdivinheACoisaController from '../controller/adivinheACoisaController.mjs'
import adivinheACoisaValidation from '../middlewares/adivinheACoisaValidation.mjs'
import SequelizeMessages from '../repositories/Messages.sequelize.repository.mjs'

const adivinheACoisaRouter = Router()
const usersRepository = new SequelizeUsers()
const assistantsRepository = new SequelizeAssistants()
const gamesHistoryRepository = new SequelizeGamesHistory()
const messagesRepository = new SequelizeMessages()
const service = new AdivinheACoisaService(usersRepository, assistantsRepository, gamesHistoryRepository, messagesRepository)
const controller = new AdivinheACoisaController(service)

adivinheACoisaRouter.get('/getwelcomemessage/:assistantId', adivinheACoisaValidation, async (req, res) => await controller.getWelcomeMessage(req, res))
adivinheACoisaRouter.post('/ask', adivinheACoisaValidation, async (req, res) => await controller.ask(req, res))
adivinheACoisaRouter.post('/createmessage', adivinheACoisaValidation, async (req, res) => await controller.createMessage(req, res))
adivinheACoisaRouter.get('/getalllastmessages', adivinheACoisaValidation, async (req, res) => await controller.getAllLastMessages(req, res))
adivinheACoisaRouter.get('/getlastmessagesfromreference/:assistantId/:createdAt', adivinheACoisaValidation, async (req, res) => await controller.getLastMessagesFromReference(req, res))
adivinheACoisaRouter.delete('/deleteconversation/:assistantId', adivinheACoisaValidation, async (req, res) => await controller.deleteAllConversationMessages(req, res))
adivinheACoisaRouter.post('/setgameover', adivinheACoisaValidation, async (req, res) => await controller.setGameOver(req, res))
adivinheACoisaRouter.get('/getassistants', async (req, res) => await controller.getAssistants(req, res))
adivinheACoisaRouter.get('/getorcreategame', adivinheACoisaValidation, async (req, res) => await controller.getOrCreateGame(req, res))

adivinheACoisaRouter.post('/googlelogin', async (req, res) => await controller.googleLogin(req, res))
adivinheACoisaRouter.post('/createuser', async (req, res) => await controller.createUser(req, res))
adivinheACoisaRouter.get('/validateandrenew', adivinheACoisaValidation, async (req, res) => await controller.validateAndRenew(req, res))
adivinheACoisaRouter.delete('/logout', adivinheACoisaValidation, async (req, res) => await controller.logout(req, res))

export { adivinheACoisaRouter }
