import { type Application } from 'express'
import { palavrouRouter } from './palavrou.routes'
import { adivinheACoisaRouter } from './adivinheACoisa.routes'

export default (app: Application): void => {
  app.use('/palavrou', palavrouRouter)
  app.use('/adivinheacoisa', adivinheACoisaRouter)
}
