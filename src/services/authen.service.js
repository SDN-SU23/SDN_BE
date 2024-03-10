'use strict'
const bcrypy = require('bcrypt');
const cryto = require('node:crypto');
const userModel = require('../models/user.model');
const { createTokenPair } = require('../helpers/jwt.helper');
const { sendMail } = require('../configs/mail.config');

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
            const tokenPair = await createTokenPair({ email, publicKey, privateKey });

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

    static register = async (data) => {
        try {
            // check mail exist
            const user = await userModel.findOne({ email: data.email });
            if (user) throw new Error('Mail is exist');
            // hash pass
            const hashPass = await bcrypy.hash(data.password, 10);
            // create user
            const result = await userModel.create({
                ...data,
                password: hashPass
            });
            return result;
        }
        catch (error) {
            global.logger.error('Service:: register', error);
            throw error;
        }
    }

    static forgotPassword = async (data) => {
        try {
            const { email } = data;
            // check mail exist
            const user = await userModel.findOne({ email: data.email });
            if (!user) throw new Error('Mail is invalid');
            // random pass 10 char
            const randomPass = Math.random().toString(36).slice(-10);
            // send mail
            const send = await sendMail(email, randomPass);
            // hash pass
            const hashPass = await bcrypy.hash(randomPass, 10);
            // update pass
            const result = await userModel.findByIdAndUpdate(user._id, {
                password: hashPass
            });
            global.logger.info('Service:: forgotPassword', result);
            return 'Your password has change, please check your mail to get new password'
        } catch (error) {
            global.logger.error('Service:: forgotPassword', error);
            throw error;
        }
    }


}

module.exports = AuthenService;