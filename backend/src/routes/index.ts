import { type Application } from 'express'
import { palavrouRouter } from './palavrou.routes.js'
import { adivinheACoisaRouter } from './adivinheACoisa.routes.js'

export default (app: Application): void => {
  app.use('/palavrou', palavrouRouter)
  app.use('/adivinheacoisa', adivinheACoisaRouter)
}
