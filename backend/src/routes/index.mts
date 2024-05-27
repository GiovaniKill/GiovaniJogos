import { type Application } from 'express'
import { palavrouRouter } from './palavrou.routes.mjs'
import { adivinheACoisaRouter } from './adivinheACoisa.routes.mjs'

export default (app: Application): void => {
  app.use('/palavrou', palavrouRouter)
  app.use('/adivinheacoisa', adivinheACoisaRouter)
}
