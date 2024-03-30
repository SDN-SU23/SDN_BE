const winston = require('winston')
const time = require('../helpers/timestamp.helper')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(
                // format log : [time] [level] [message]
                (info) => `[${time.getNowFormat('hh:mm:ss yyyy-mm-dd')}] [${info.level}] ${info.message}`,
            ),
        }),
        new winston.transports.File({
            filename: `./logs/${time.getNowFormat('YYYY-MM-DD')}.log`,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.json()
            ),
        }),
    ],
})
module.exports = logger