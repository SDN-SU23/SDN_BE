'use strict'

const artworkModel = require('../models/artwork.model')
const reactModel = require('../models/react.model')
const { getListInfo } = require('../utils')

class ArtworkService {
    static getListArtwork = async (query) => {
        try {
            let { searchName, categoryName, currentPage, pageSize } = query
            // init filter
            let filter = {}
            // check if category is an array
            if (categoryName) {
                categoryName = category.split(',')
                filter.category = { $in: categoryName }
            }
            // check searchName 
            if (searchName) {
                filter.name = { $regex: searchName, $options: 'i' };
            }
            // return list of artwork
            const result = await artworkModel
                .find(filter)
                .limit(pageSize)
                .skip((currentPage - 1) * pageSize)
                .populate('authorId')
                .lean();
            // get total page
            const totalPage = Math.ceil(result.length / pageSize)
            // return filter data and total page
            const artwork = result.map((item) => {
                return {
                    artworkId: item._id,
                    artworkURL: item.imageURL,
                    authorAvatar: item.authorId.avatar,
                    authorName: item.authorId.name,
                }
            })

            return {
                artwork,
                currentPage: currentPage,
                totalPage: totalPage,
                pageSize: pageSize
            };

        } catch (error) {
            global.logger.error('Service:: getListArtwork', error)
            throw error
        }
    }

    static getArtworkDetail = async (artworkId) => {
        try {
            const result = await artworkModel.findById(artworkId).lean()
            // get react of artwork
            const reactList = await reactModel.find({ artworkId: artworkId }).lean()

            return {
                ...result,
                reactList
            }
        } catch (error) {
            global.logger.error('Service:: getArtworkDetail', error)
            throw error
        }
    }

    static createArtwork = async (data, user) => {
        try {
            const result = await artworkModel.create({
                ...data,
                authorId: user._id,
            })
            return result;
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
