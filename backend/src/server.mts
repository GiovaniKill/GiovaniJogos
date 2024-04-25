import 'dotenv/config'
import App from './app.mjs'

const PORT = process.env.APP_PORT ?? 3001

new App().start(PORT)
