'use strict';
// single turn
const mongoose = require('mongoose');

let connectDB;
if (process.env.NODE_ENV === 'dev') {
    connectDB = `mongodb+srv://${global.config.db.host}:${global.config.db.pass}@${global.config.db.name}.6zwe7mm.mongodb.net/`;
} else {
    connectDB = `mongodb://${global.config.db.host}:${global.config.db.port}/${global.config.db.name}`
}

const { countConnect } = require('../helpers/checkConnection.helper');
class Database {
    constructor() {
        this.connect();
    }
    // connect 
    connect(type = 'mongodb') {
        if (process.env.NODE_ENV === 'dev') {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectDB,
            {
                maxPoolSize: 50
            }
        )
            .then(_ => {
                console.log('Connect to database successfully', countConnect());
            })
            .catch(err => console.log(err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;