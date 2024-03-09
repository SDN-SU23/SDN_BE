'use strict'

const CommentService = require('../services/comment.service')

class CommentController {
    getListCommentByArtworkId = async (req, res) => {
        try {
            const artworkId = req.params.artworkId

            const result =
                await CommentService.getListCommentByArtworkId(artworkId)

            if (!result) {
                return res.status(404).json({
                    status: '404 Not Found',
                    message: 'Commnent not found',
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

    getCommentById = async (req, res) => {
        try {
            const commentId = req.params.commentId
            const result = await CommentService.getCommentById(commentId)

            if (!result) {
                return res.status(404).json({
                    status: '404 Not Found',
                    message: 'Commnent not found',
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

    createComment = async (req, res) => {
        try {
            const data = await CommentService.createComment(req.body)

            return res.status(200).json({
                status: 200,
                data: data,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    createCommentChildren = async (req, res) => {
        try {

            return res.status(200).json({
                status: 200,
                data: await CommentService.createCommentChildren(req.params.commentParentId, req.body),
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    updateComment = async (req, res) => {
        try {
            const commentId = req.params.commentId
            const comment = req.body

            const updateComment = await CommentService.updateComment(
                commentId,
                comment
            )

            return res.status(200).json({
                status: 200,
                data: updateComment,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    deleteComment = async (req, res) => {
        try {
            const result = await CommentService.deleteComment(
                req.params.commentId
            )
            return res.status(200).json({
                status: 200,
                message: 'Comment deleted successfully',
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }

    updateCommentChildren = async (req, res) => {
        try {
            return res.status(200).json({
                status: 200,
                data: await CommentService.updateCommentChildren(req.params.commentParentId, req.body),
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            })
        }
    }
}

module.exports = new CommentController()
