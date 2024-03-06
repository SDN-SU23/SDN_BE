const express = require('express');
const router = express.Router();
const { uploadDisk } = require('../configs/multer.config');
const UploadController = require('../controllers/upload.controller');

router.post('/upload', UploadController.uploadImageFromURL);
router.post('/upload/thumb', uploadDisk.single('file'), UploadController.uploadImageFromLocal);

module.exports = router;