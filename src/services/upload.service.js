const cloudinary = require('../configs/cloudinary.config');
const { getInfo } = require('../utils/index');

// upload image from url
const uploadImageFromURL = async (uriImage, imageName, userId) => {

    try {
        const result = await cloudinary.uploader.upload(
            uriImage,
            {
                public_id: imageName,
                folder: `artWork/${userId}`
            }
        )

        return result;
    } catch (error) {
        console.log(`error`, error);
    }
}

// upload image from local
const uploadImageFromLocal = async ({ path, imageName, userId }) => {
    try {
        const result = await cloudinary.uploader.upload(
            path,
            {
                public_id: '123',
                folder: `artWork/thumb`
            })
        return {
            image_url: result.secure_url,
            shopId: 8496
        }
    } catch (error) {
        console.log('Error in uploading the file : ', error);
    }
}

module.exports = {
    uploadImageFromURL,
    uploadImageFromLocal
}
