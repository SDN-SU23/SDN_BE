'use strict'

const HEADER = {
    'AUTHENTICATION': 'x-authentication',
    'USER_ID': 'x-api-id'
}

const permission = (req, res, next) => {
    const token = req.headers[HEADER.AUTHENTICATION]
    if (token) {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

const authen = (req, res, next) => {
    const token = req.headers[HEADER.AUTHENTICATION]
    if (token) {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    permission,
    authen
}