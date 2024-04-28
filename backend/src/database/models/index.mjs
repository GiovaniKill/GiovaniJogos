/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'dotenv/config'
import { Sequelize } from 'sequelize'
import * as config from '../config/config.cjs'

const index = new Sequelize(config[process.env.NODE_ENV])

export default index
