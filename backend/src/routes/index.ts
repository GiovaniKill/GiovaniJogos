import { type Application } from 'express'
import { palavrouRouter } from './palavrou.routes'

export default (app: Application): void => {
  app.use('/palavrou', palavrouRouter)
}
