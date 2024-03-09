const jwt = require('jsonwebtoken');
const keyTokenModel = require('../models/keyToken.model');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(payload, privateKey, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign(payload, privateKey, {
            expiresIn: '7d'
        });
        // verify token
        const decodeToken = jwt.verify(accessToken, publicKey, {});
        if (!decodeToken) {
            throw new Error('Token is invalid');
        }
        // save public key
        await keyTokenModel.findOneAndUpdate({
            email: payload.email
        }, {
            publicKey: publicKey
        }, {
            upsert: true
        });
        // return token
        return {
            accessToken,
            refreshToken
        }
        // 

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTokenPair
}