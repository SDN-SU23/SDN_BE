'use strict'

const { getListInfo, getInfo } = require('../utils')
const commentModel = require('../models/comment.model');
const artworkModel = require('../models/artwork.model');
const notificationService = require('./notification.service');
class CommentService {
    static getListCommentByArtworkId = async (artworkId) => {
        try {
            const result = await commentModel.find({ artworkId }).populate('authorId').lean()
            return result
        } catch (error) {
            global.logger.error('Service:: getListCommentByArtworkId', error)
            throw error
        }
    }
    static getCommentById = async (commentId) => {
        try {
            const result = await commentModel.findById(commentId)
            return result
        } catch (error) {
            global.logger.error('Service:: getCommentById', error)
            throw error
        }
    }
    static createComment = async (comment) => {
        try {
            const result = await commentModel.create(comment);
            // send notification to author of comment

            const artwork = await artworkModel.findOne({
                _id: comment.artworkId
            });

            await notificationService.createNotification({
                user_id: artwork.authorId,
                message: `Comment in your ${artwork.title} has been created`
            })

            return result
        } catch (error) {
            global.logger.error('Service:: createComment', error)
            throw error
        }
    }
    static updateComment = async (commentId, comment) => {
        try {
            const result = await commentModel.findByIdAndUpdate(
                commentId,
                { $set: comment }
            )

            if (!result) {
                throw new Error('Comment not found')
            }

            // send notification to author of comment
            const artwork = await artworkModel.findOne({
                _id: result.artworkId
            })

            await notificationService.createNotification({
                user_id: result.authorId,
                message: `Comment in your ${artwork.title} has been updated`
            })

            return result;
        } catch (error) {
            global.logger.error('Service:: updateComment', error)
            throw error
        }
    }
    static createCommentChildren = async (commentParentId, comment) => {
        try {
            // Check if comment parent exist
            const isCommentParentExist = await commentModel.findById(commentParentId);
            if (!isCommentParentExist) {
                throw new Error('Comment parent not found')
            }
            // Update comment childern to array
            const result = await commentModel.findByIdAndUpdate({
                _id: commentParentId
            }, {
                $push: {
                    comment_children: comment
                }
            });
            // send notification to author of comment
            await notificationService.createNotification({
                user_id: comment.authorId,
                message: `Comment in your ${comment.artworkId} has been created`
            })
            return result

        } catch (error) {
            global.logger.error('Service:: createCommentChildren', error)
            throw error
        }
    }

    static deleteComment = async (commentId) => {
        try {
            const result = await commentModel.findByIdAndDelete(commentId);
            return result
        } catch (error) {
            global.logger.error('Service:: deleteComment', error)
            throw error
        }
    }

    static updateCommentChildren = async (commentParentId, comment) => {
        try {
            const result = await commentModel.findByIdAndUpdate({
                _id: commentParentId
            }, {
                $set: {
                    comment_children: comment
                }
            });
            return result
        }
        catch (error) {
            global.logger.error('Service:: updateCommentChildren', error)
            throw error
        }
    }
}

module.exports = CommentService
