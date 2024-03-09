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
const uploadImageFromLocal = async ({ path, imageName, userId = '123' }) => {
    try {
        const result = await cloudinary.uploader.upload(
            path,
            {
                public_id: `${imageName}`,
                folder: `artWork/1`,
                fetch_format: 'auto',
            }
        )

        console.log('result : ', result);

        return {
            imageURL: result.secure_url,
        }
    } catch (error) {
        console.log('Error in uploading the file : ', error);
    }
}

const getImageFromUrl = async (url) => {
    try {
        const result = await cloudinary.image(url);

        return result;
    } catch (error) {
        console.log(`error`, error);
    }
}

module.exports = {
    uploadImageFromURL,
    uploadImageFromLocal
}
