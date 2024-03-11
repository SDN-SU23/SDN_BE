'use strict'

const artworkModel = require('../models/artwork.model')
const reactModel = require('../models/react.model')
const commentModel = require('../models/comment.model')
const { createSignedUrlDetail } = require('../services/upload.service');

class ArtworkService {
    static getListArtwork = async (query) => {
        try {
            let { searchName, categoryName, currentPage, pageSize, userId } = query
            // init filter
            let filter = {}
            // check if category is an array
            if (categoryName) {
                categoryName = category.split(',')
                filter.category = { $in: categoryName }
            }
            // check searchName 
            if (searchName) {
                filter.title = { $regex: searchName, $options: 'i' };
            }
            // return list of artwork
            const result = await artworkModel
                .find(filter)
                .limit(pageSize)
                .skip((currentPage - 1) * pageSize)
                .populate('authorId')
                .lean();
            // get total page
            const totalPage = Math.ceil(await artworkModel.countDocuments(filter) / pageSize)
            // return filter data and total page
            const artwork = result.map((item) => {
                return {
                    artworkId: item._id,
                    artworkURL: item.imageURL,
                    authorAvatar: item.authorId.avatarUrl,
                    authorName: item.authorId.name,
                    isLike: false,
                    status: item.status,
                    price: item.price,
                    authorId: item.authorId,
                }
            });
            // get signed url of artwork
            // for (let i = 0; i < artwork.length; i++) {
            //     artwork[i].artworkURL = await createSignedUrlDetail(artwork[i].artworkURL)
            // }
            // check like of user
            if (userId) {
                for (let i = 0; i < artwork.length; i++) {
                    let react = await reactModel.findOne({ userId: userId, artworkId: artwork[i].artworkId })
                    if (react) {
                        artwork[i].isLike = true
                    } else {
                        artwork[i].isLike = false
                    }
                }
            }

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

    static getArtworkDetail = async (artworkId, userId) => {
        try {
            let result = await artworkModel.findById(artworkId).populate('authorId').lean();
            if (result) {
                result = {
                    title: result.title,
                    imageURL: result.imageURL,
                    description: result.description,
                    authorName: result.authorId.name,
                    authorAvatar: result.authorId.avatarUrl,
                    category: result.category,
                    status: result.status,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    price: result.price,
                    status: result.status,
                    commentNumber: result.commentNumber,
                    reactNumber: result.reactNumber,
                    isLike: false,
                    // imageURL: await createSignedUrlDetail(result.imageURL)
                    status: result.status
                }
            }
            // get react of artwork
            let reactList = await reactModel.find({ artworkId: artworkId }).populate('userId').lean();

            if (reactList) {
                reactList = reactList.map((item) => {
                    return {
                        authorAvatar: item.userId.avatarUrl,
                        authorName: item.userId.name,
                        authorId: item.userId._id
                    }
                })
            }
            // get comment of artwork
            let commentList = await commentModel.find({ artworkId: artworkId }).populate('authorId').lean();

            if (commentList) {
                commentList = commentList.map((item) => {
                    return {
                        authorAvatar: item.authorId.avatarUrl,
                        authorName: item.authorId.name,
                        content: item.content,
                        commentId: item._id,
                    }
                })
            }
            // check like of user
            if (userId) {
                let react = await reactModel.findOne({ userId: userId, artworkId: artworkId })
                if (react) {
                    result.isLike = true
                } else {
                    result.isLike = false
                }
            }

            return {
                commentList,
                artwork: result,
                reactList
            }
        } catch (error) {
            global.logger.error('Service:: getArtworkDetail', error)
            throw error
        }
    }

    static createArtwork = async (data) => {
        try {
            const result = await artworkModel.create(data);
            return result;
        } catch (error) {
            global.logger.error('Service:: createArtwork', error)
            throw error
        }
    }

    static deleteArtwork = async (artworkId) => {
        try {
            const result = await artworkModel.findByIdAndUpdate(artworkId, { status: 'private' });
            return result
        } catch (error) {
            global.logger.error('Service:: deleteArtwork', error)
            throw error
        }
    }

    static updateArtwork = async (artworkId, data) => {
        try {
            const result = await artworkModel
                .findByIdAndUpdate(
                    artworkId,
                    data,
                    { new: true }
                )
            return result
        }
        catch (error) {
            global.logger.error('Service:: updateArtwork', error)
            throw error
        }
    }

    static updateArtworkByAdmin = async (artworkId, status) => {
        try {
            const result = await artworkModel.findByIdAndUpdate(artworkId, { status: status }, { new: true })
            return result
        }
        catch (error) {
            global.logger.error('Service:: updateArtworkByAdmin', error)
            throw error
        }
    }

    static getArtWorkByAdmin = async (query) => {
        try {
            let { searchName, currentPage, pageSize, status } = query
            // init filter
            let filter = {}
            // check searchName 
            if (searchName) {
                filter.name = { $regex: searchName, $options: 'i' };
            }
            // check status
            if (status) {
                filter.status = status
            }
            // return list of artwork
            const result = await artworkModel
                .find(filter)
                .limit(pageSize)
                .skip((currentPage - 1) * pageSize)
                .populate('authorId')
                .lean();
            // get total page
            const totalPage = Math.ceil(await artworkModel.countDocuments(filter) / pageSize)

            return {
                result,
                currentPage: currentPage,
                totalPage: totalPage,
                pageSize: pageSize
            };

        } catch (error) {
            global.logger.error('Service:: getArtWorkByAdmin', error)
            throw error
        }
    }
}

module.exports = ArtworkService
