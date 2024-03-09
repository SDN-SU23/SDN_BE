'use strict'

const { getListInfo, getInfo } = require('../utils')
const commentModel = require('../models/comment.model')

class CommentService {
    static getListCommentByArtworkId = async (artworkId) => {
        try {
            const result = await commentModel.find({ artworkId })
            console.log(result)
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
            const result = await commentModel.create(comment)
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
                { $set: comment },
                { new: true }
            )

            if (!result) {
                throw new Error('Comment not found')
            }

            return result
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
            return result

        } catch (error) {
            global.logger.error('Service:: createCommentChildren', error)
            throw error
        }
    }

    static deleteComment = async (commentId) => {
        try {
            const result = await commentModel.findByIdAndDelete(commentId)
            const findParent = await commentModel.find({
                comment_children: { $in: [commentId] },
            })
            console.log(findParent)
            if (findParent.length > 0) {
                const updateParent = await commentModel.findOneAndUpdate(
                    { _id: findParent[0]._id.toString() },
                    { $pull: { comment_children: commentId } },
                    { new: true }
                )
            }
            return result
        } catch (error) {
            global.logger.error('Service:: deleteComment', error)
            throw error
        }
    }
}

module.exports = CommentService
