'use strict'
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const passport = require('../configs/passport.config');

const HEADER = {
    'AUTHENTICATION': 'x-authentication',
    'USER_ID': 'x-api-email',
    'REFRESH_TOKEN': 'x-refresh-token'
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

const isLogin = (req, res, next) => {
    // check access token
    if (!req.headers[HEADER.AUTHENTICATION]) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    } else {
        if (!req.headers[HEADER.REFRESH_TOKEN]) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        if (!req.headers[HEADER.USER_ID]) {
            return res.status(401).json({
                message: 'missing user id'
            })
        }

        const user = userModel.findOne({
            _id: req.headers[HEADER.USER_ID]
        })

    }
}

const googleAuthen = async (req, res, next) => {

}

module.exports = {
    permission,
    isLogin
}