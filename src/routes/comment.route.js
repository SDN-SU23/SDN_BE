const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')
const { checkIsLogin } = require('../auth');

router.get('/getList/:artworkId', commentController.getListCommentByArtworkId)

router.get('/:commentId', commentController.getCommentById)

router.use(checkIsLogin)

router.post('/', commentController.createComment)

router.post('/createCommentChildren/:commentParentId', commentController.createCommentChildren)

router.delete('/:commentId', commentController.deleteComment)

router.put('/:commentId', commentController.updateComment)

router.put('/updateCommentChildren/:commentParentId', commentController.updateCommentChildren)

module.exports = router
