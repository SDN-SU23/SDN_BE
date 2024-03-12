'use strict'

const {
    uploadImageFromURL,
    uploadImageFromLocal,
} = require('../services/upload.service')

class UploadController {
    uploadImageFromURL = async (req, res) => {
        try {
            return res.status(200).json({
                metadata: await uploadImageFromURL(
                    req.body.uriImage,
                    req.body.imageName,
                    req.body.userId
                ),
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message,
            })
        }
    }

    uploadImageFromLocal = async (req, res) => {
        try {
            const { file } = req
            console.log(`Uploading ${file}`)
            if (!file) {
                throw new Error('file is not exist')
            }

            return res.status(200).json({
                metadata: await uploadImageFromLocal({
                    path: file.path,
                    imageName: file.filename,
                }),
            })
        } catch (error) {
            return res.status(500).json({
                error: error,
            })
        }
    }
}

module.exports = new UploadController()
