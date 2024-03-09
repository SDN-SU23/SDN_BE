'use strict'
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const keyTokenModel = require('../models/keyToken.model');

const HEADER = {
    'AUTHENTICATION': 'x-authentication', // access token
    'USER_EMAIL': 'x-api-email',            // user email
    'REFRESH_TOKEN': 'x-refresh-token'   // refresh token
}

const checkIsLogin = async (req, res, next) => {
    // check access token is valid
    const userMail = req.headers[HEADER.USER_EMAIL];
    if (!userMail) {
        return res
            .status(401)
            .json({ message: 'Missing email' });
    }
    // get user by email
    const user = await userModel.findOne({
        email: userMail
    });
    // check access token is valid
    const accessToken = req.headers[HEADER.AUTHENTICATION];
    if (!accessToken) {
        // check refresh token
        const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
        if (!refreshToken) {
            return res
                .status(401)
                .json({ message: 'Missing token' });
        }
        // check key token in db
        const keyToken = await keyTokenModel.findOne({
            email: userMail
        });
        if (!keyToken) {
            return res
                .status(401)
                .json({ message: 'Token is invalid' });
        }
        // verify refresh token
        const decodeToken = jwt.verify(refreshToken, keyToken.publicKey, {});
        if (!decodeToken) {
            return res
                .status(401)
                .json({ message: 'Token is invalid' });
        }
        // set req user === user
        req.user = user;
        return next();

    }
    // check key token in db
    const keyToken = await keyTokenModel.findOne({
        email: userMail
    });
    if (!keyToken) {
        return res
            .status(401)
            .json({ message: 'Token is invalid' });
    }
    // verify access token
    const decodeToken = jwt.verify(accessToken, keyToken.publicKey, {});
    if (!decodeToken) {
        return res
            .status(401)
            .json({ message: 'Token is invalid' });
    }

    return next()
}


const checkRole = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res
                .status(403)
                .json({ message: 'Permission denied' });
        }
        return next();
    }
}

module.exports = {
    checkIsLogin,
    checkRole
}