const cloudinary = require('../configs/cloudinary.config');


const uploadImage = async (uriImage, publicId, folderName) => {

    try {
        const result = await cloudinary.uploader.upload(
            uriImage,
            {
                public_id: publicId,
                folder: folderName
            }
        )
        return result;
    } catch (error) {
        console.log(`error`, error);
    }
}

module.exports = {
    uploadImage
}
