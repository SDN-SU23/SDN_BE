'use strict'

// connect string
const connectString = 'mongodb://localhost:27017/test'


class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(connectString, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }


}

module.exports = new Database()

