import express from 'express'
import routes from './routes/index.mjs'
import errorHandler from './middlewares/errorHandler.mjs'

class App {
  public app: express.Express

  constructor () {
    this.app = express()

    this.config()

    routes(this.app)
    this.app.use(errorHandler)
  }

  public start (PORT: string | number): void {
    this.app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
  }

  private config (): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    }

    this.app.use(express.json())
    this.app.use(accessControl)
  }
}

export default App
