'use strict'

// connect string
const mongoose = require('mongoose')
const connectString = `mongodb://${global.config.db.host}:${global.config.db.port}/${global.config.db.name}`


class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(connectString)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

}

module.exports = new Database()

