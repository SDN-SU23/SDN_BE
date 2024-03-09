'use strict'

const UserService = require("../services/user.service")

class UserController {
    getListUser = async (req, res) => {
        try {

            return res
                .status(200)
                .json({
                    status: 200,
                    data: await UserService.getListUser(req.query)
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    createUser = async (req, res) => {
        try {
            const data = await UserService.createUser(req.body);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    getUserById = async (req, res) => {
        try {
            const data = await UserService.getUserById(req.params.userId);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    getProfileById = async (req, res) => {
        try {
            const data = await UserService.getProfileById(req.params.userId);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    changePassword = async (req, res) => {
        try {
            const data = await UserService.changePassword(req.params.userId, req.body.password);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    updateUser = async (req, res) => {
        try {
            const data = await UserService.updateUser(req.params.userId, req.body);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const data = await UserService.deleteUser(req.params.userId);

            return res
                .status(200)
                .json({
                    status: 200,
                    data: data
                })

        } catch (error) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: error.message
                })
        }
    }
}

module.exports = new UserController();