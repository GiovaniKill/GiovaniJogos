import { Sequelize } from 'sequelize'
import * as config from '../config/config.cjs'

const index = new Sequelize(config)

export default index
