require('dotenv').config();

const dev = {
    app: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        pass: process.env.DB_PASSWORD
    }
}

const product = {
    app: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },
    db: {
        host: process.env.DB_HOST_PRO,
        port: process.env.DB_PORT_PRO,
        name: process.env.DB_NAME_PRO
    }
}

const config = { dev, product };


module.exports = config[process.env.NODE_ENV || 'dev'];

// const config = s