const cloudinary = require('../configs/cloudinary.config');
const { getInfo } = require('../utils/index');
const supabase = require('../configs/supabase.config');

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
        // set default folder
        const result = await cloudinary.uploader.upload(
            path,
            {
                public_id: `${imageName}`,
                folder: `artWork/1`
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

const createSignedUrl = async (authorId, title) => {
    try {
        const { data, error } = await supabase
            .storage
            .from('SDN')
            .createSignedUrl(`${authorId}/${title}`, 20, { transform: { width: 100, height: 100 } });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

const uploadImageSupabase = async (file) => {
    try {
        const { data, error } = await supabase
            .storage
            .from('SDN')
            .uploadToSignedUrl('file', file);
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadImageFromURL,
    uploadImageFromLocal
}
