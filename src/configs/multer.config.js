'use strict'

const multer = require('multer');
const time = require('../helpers/timestamp.helper');

const uploadMemory = multer({
    storage: multer.memoryStorage()
})

const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/upload/')
        },
        filename: function (req, file, cb) {
            cb(null, `${time.getNowDate()}-${file.originalname}`)
        }
    })
})

module.exports = {
    uploadDisk,
    uploadMemory
}