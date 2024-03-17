const express = require('express')
const router = express.Router()
const artworkController = require('../controllers/artwork.controller')
const { uploadDisk } = require('../configs/multer.config')
const { checkIsLogin, checkRole } = require('../auth/index')

router.get('/', artworkController.getListArtwork)

// router.use(checkIsLogin);

// router.use(checkRole('Creator'))

router.get('/getListArtWorkByCreator/:userId', artworkController.getListArtWorkByCreator)

router.post('/', artworkController.createArtwork)

router.delete('/:artworkId', artworkController.deleteArtwork)

router.get('/getArtWorkDetailByUser/:artworkId', artworkController.getArtworkDetail)

router.put('/:artworkId', artworkController.updateArtwork)

// router.use(checkRole('Admin'))

router.put('/updateByAdmin/:artworkId', artworkController.updateArtworkByAdmin)

router.get('/getArtWorkByAdmin', artworkController.getArtWorkByAdmin)

module.exports = router
