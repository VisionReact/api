const winston = require("winston");
const config = require("../config/index");
const Utils = require("../util/utils");
const path = require('path')

const { format, transports } = winston

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const AppName = config.applicationName

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        }),
        new transports.File({
            filename: `${config.logs.path}${AppName}-${Utils.getCurrentTimeStamp()}.log`,
            format: format.combine(
                format.json(),
                format.prettyPrint()
            )
        })
    ],
    exitOnError: false
})

module.exports = {
    Logger: LoggerInstance
}