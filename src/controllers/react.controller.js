'use strict'

const ReactService = require('../services/react.service');

class ReactController {
    createNewReact = async (req, res) => {
        try {
            return res
                .status(201)
                .json({
                    message: 'React created successfully',
                    data: await ReactService.createNewReact(req.body)
                })
        } catch (error) {
            return res
                .status(500)
                .json({ message: error.message })
        }
    }

    deleteReact = async (req, res) => {
        try {
            return res
                .status(200)
                .json({
                    message: 'React deleted successfully',
                    data: await ReactService.deleteReact(req.query)
                })
        } catch (error) {
            return res
                .status(500)
                .json({ message: error.message })
        }
    }

    getReactByArtworkId = async (req, res) => {
        try {
            return res
                .status(200)
                .json({
                    message: 'React deleted successfully',
                    data: await ReactService.getReactByArtworkId(req.params.artworkId)
                })
        } catch (error) {
            return res
                .status(500)
                .json({ message: error.message })
        }
    }
}

module.exports = new ReactController();