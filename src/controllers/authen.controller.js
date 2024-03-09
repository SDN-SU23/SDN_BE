'use strict'
const authenService = require('../services/authen.service');

class AuthenController {

    login = async (req, res) => {
        try {
            return res.status(200).json({
                metadata: await authenService.login(req.body)
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    register = async (req, res) => {
        try {
            return res.status(201).json({
                metadata: await authenService.register(req.body)
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = new AuthenController();