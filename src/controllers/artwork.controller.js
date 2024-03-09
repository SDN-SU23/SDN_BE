'use strict'

const ArtworkService = require('../services/artwork.service')

class ArtworkController {
    getListArtwork = async (req, res) => {
        try {

            return res.status(200).json({
                status: 200,
                data: await ArtworkService.getListArtwork(req.query)
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    getArtworkDetail = async (req, res) => {
        try {
            const artworkId = req.params.artworkId

            const result = await ArtworkService.getArtworkDetail(artworkId)

            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: 'Artwork not found',
                })
            }

            return res.status(200).json({
                status: 200,
                data: result,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    createArtwork = async (req, res) => {
        try {
            return res
                .status(201)
                .json({
                    status: 201,
                    data: await ArtworkService.createArtwork(req.body, req.user)
                })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    deleteArtwork = async (req, res) => {
        try {
            const artworkId = req.params.artworkId

            const result = await ArtworkService.deleteArtwork(artworkId)

            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: 'Artwork not found',
                })
            }

            return res.status(200).json({
                status: 200,
                message: 'Artwork deleted successfully',
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    updateArtwork = async (req, res) => {
        try {
            const artworkId = req.params.artworkId

            const result = await ArtworkService.updateArtwork(artworkId, req.body)

            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: 'Artwork not found',
                })
            }

            return res.status(200).json({
                status: 200,
                data: result,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    updateArtworkByAdmin = async (req, res) => {
        try {
            const artworkId = req.params.artworkId

            const result = await ArtworkService.updateArtworkByAdmin(artworkId, req.body)

            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: 'Artwork not found',
                })
            }

            return res.status(200).json({
                status: 200,
                data: result,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }
}

module.exports = new ArtworkController()
