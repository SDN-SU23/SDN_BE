'use strict'
const authenService = require('../services/authen.service');

class AuthenController {

    login = async (req, res) => {
        try {
            return res.status(200).json({
                metadata: await authenService.login(req.body)
            })
        } catch (error) {

        }
    }
}

module.exports = new AuthenController();