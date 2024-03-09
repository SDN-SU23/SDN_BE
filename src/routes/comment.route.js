const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

router.get('/getList/:artworkId', commentController.getListCommentByArtworkId)
router.get('/:commentId', commentController.getCommentById)
router.post('/:artwordId', commentController.createComment)
router.post('/create-comment-children/:commentParentId', commentController.createCommentChildren)
router.delete('/:commentId', commentController.deleteComment)
router.put('/:commentId', commentController.updateComment)

module.exports = router
