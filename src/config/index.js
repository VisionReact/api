
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = require ('dotenv').config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {

  /**
   * Environment
   */

  node: {
    env: process.env.ENV
  },

  /**
  * Application variables
  */

  applicationName: process.env.APPLICATION_NAME,
  applicationDescription: process.env.APPLICATION_DESCRIPCION,
  applicationVersion: process.env.npm_package_version,

  /**
   * Define your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mysql
   */
  databaseURL: process.env.MYSQL_URI,
  databaseDB: process.env.MYSQL_DB,
  databaseUSER: process.env.MYSQL_USER,
  databasePASS: process.env.MYSQL_PASSWORD,
  databasePORT: process.env.MYSQL_PORT,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    path: process.env.LOG_PATH
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  }
};

module.exports = config;