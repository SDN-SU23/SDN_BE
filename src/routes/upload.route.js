const express = require('express');
const router = express.Router();
const { uploadDisk } = require('../configs/multer.config');
const UploadController = require('../controllers/upload.controller');
const { checkIsLogin } = require('../auth');

// router.use(checkIsLogin)

router.post('/', UploadController.uploadImageFromURL);

router.post('/thumb', uploadDisk.single('file'), UploadController.uploadImageFromLocal);
// router.get('/', UploadController.getImage);

module.exports = router;