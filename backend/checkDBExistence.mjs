import 'dotenv/config'
import { Sequelize } from 'sequelize'
import * as config from './src/database/config/config.cjs'

const sequelize = new Sequelize(config[process.env.NODE_ENV ?? 'development'])

const verify = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database exists');
    process.exit(0);
  } catch (error) {
    console.log('Database does not exist');
    process.exit(1);
  }
};

verify();
