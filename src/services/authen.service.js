'use strict'
const bcrypy = require('bcrypt');
const cryto = require('node:crypto');
const userModel = require('../models/user.model');
const { createTokenPair } = require('../helpers/jwt.helper');

class AuthenService {
    static login = async ({ email, password }) => {
        try {
            // check mail exist
            const user = await userModel.findOne({ email: email });
            if (!user) throw new Error('Mail is invalid');
            // check pass exist
            const isPass = await bcrypy.compare(password, user.password);
            if (!isPass) throw new Error('Pass is invalid');
            // create public key , private Key
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                }
            });
            // create token pair 
            const tokenPair = createTokenPair({ email, publicKey, privateKey });

            return {
                accessToken: tokenPair.accessToken,
                refreshToken: tokenPair.refreshToken,
                userMail: email,
                userId: user._id,
            };

        } catch (error) {
            global.logger.error('Service:: login', error);
            throw error;
        }
    }
}

module.exports = AuthenService;