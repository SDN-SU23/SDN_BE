'use strict'

const artworkModel = require('../models/artwork.model')
const { getListInfo, getInfo } = require('../utils')

class ArtworkService {
    static getListArtwork = async () => {
        try {
            const result = await artworkModel.find({})
            return getListInfo({
                // field: ["name", "email"],
                object: result,
            })
        } catch (error) {
            global.logger.error('Service:: getListArtwork', error)
            throw error
        }
    }

    static getArtworkDetail = async (artworkId) => {
        try {
            const result = await artworkModel.findById(artworkId)

            return result
        } catch (error) {
            global.logger.error('Service:: getArtworkDetail', error)
            throw error
        }
    }

    static createArtwork = async (data) => {
        try {
            const result = await artworkModel.create(data)
            return result
        } catch (error) {
            global.logger.error('Service:: createArtwork', error)
            throw error
        }
    }

    static updateArtwork = async (artworkId, newData) => {
        try {
            const result = await artworkModel.findByIdAndUpdate(
                artworkId,
                { $set: newData },
                { new: true }
            )

            if (!result) {
                throw new Error('Artwork not found')
            }

            return result
        } catch (error) {
            global.logger.error('Service:: updateArtwork', error)
            throw error
        }
    }

    static deleteArtwork = async (artworkId) => {
        try {
            const result = await artworkModel.findByIdAndDelete(artworkId)
            return result
        } catch (error) {
            global.logger.error('Service:: deleteArtwork', error)
            throw error
        }
    }
}

module.exports = ArtworkService
