const jwt = require('jsonwebtoken');
const keyTokenModel = require('../models/keyToken.model');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(payload, privateKey, {
            'algorithm': 'RS256',
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign(payload, privateKey, {
            'algorithm': 'RS256',
            expiresIn: '7 days'
        });
        // verify token
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('Verify error::', err)
            } else {
                console.log('decode::', decode)
            }
        })
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
        global.logger.error('Helper:: createTokenPair', error);
        throw error;
    }
}

module.exports = {
    createTokenPair
}