/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import Service from '../service/adivinheACoisaService.mjs'
import SequelizeUsers from '../repositories/Users.sequelize.repository.mjs'

const adivinheACoisaRouter = Router()
const usersRepository = new SequelizeUsers()
const service = new Service(usersRepository)

adivinheACoisaRouter.post('/ask', async (req, res) => await service.ask(req, res))
adivinheACoisaRouter.post('/getgameovermessage', async (req, res) => await service.getGameOverMessage(req, res))
adivinheACoisaRouter.get('/getassistants', async (req, res) => await service.getAssistants(req, res))
adivinheACoisaRouter.get('/getthinginfo', async (req, res) => await service.getThingInfo(req, res))

adivinheACoisaRouter.post('/createuser', async (req, res) => await service.createUser(req, res))

export { adivinheACoisaRouter }
