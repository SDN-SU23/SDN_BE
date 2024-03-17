'use strict'
const bcrypy = require('bcrypt');
const crypto = require('node:crypto');
const userModel = require('../models/user.model');
const { createTokenPair } = require('../helpers/jwt.helper');
const { sendMail } = require('../configs/mail.config');
const { forgotPassword, newAccount } = require('../utils/mail.util')

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
            const tokenPair = await createTokenPair({ email: email }, publicKey, privateKey);

            return {
                accessToken: tokenPair.accessToken,
                refreshToken: tokenPair.refreshToken,
                userMail: email,
                userId: user._id,
                role: user.role,
                avatar: user.avatarUrl
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
            // send mail
            await sendMail({
                userMail: data.email,
                subject: 'Welcome to ArtWork',
                text: `You have successfully registered an account at ArtWork`,
                html: newAccount({
                    user_mail: data.email,
                    user_name: data.name,
                    user_password: data.password,
                    user_role: data.role
                })
            })
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
            // hash pass
            const hashPass = await bcrypy.hash(randomPass, 10);
            // update pass
            const result = await userModel.findByIdAndUpdate(user._id, {
                password: hashPass
            });
            await sendMail({
                userMail: email,
                subject: 'Your password has change',
                text: `Your new password is ${randomPass}`,
                html: forgotPassword({
                    user_mail: email,
                    new_password: randomPass
                })
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