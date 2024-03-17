const cloudinary = require('../configs/cloudinary.config')
const { getInfo } = require('../utils/index')
const supabase = require('../configs/supabase.config')
const artworkModel = require('../models/artwork.model');
// upload image from url
class UploadService {
    static uploadImageFromURL = async (uriImage, imageName, userId) => {
        try {
            const result = await cloudinary.uploader.upload(uriImage, {
                public_id: imageName,
                folder: `artWork/${userId}`,
            })

            return result
        } catch (error) {
            console.log(`error`, error)
        }
    }

    // upload image from local
    static uploadImageFromLocal = async ({ path, imageName }) => {
        try {
            console.log(imageName)
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
            console.log('Error in uploading the file : ', error)
        }
    }

    static createSignedUrlDetail = async (imageFolder) => {
        try {
            const { data, error } = await supabase.storage
                .from('SDN')
                .createSignedUrl(`${imageFolder} `, 60)
            return data
        } catch (error) {
            throw error
        }
    }

    static downloadImageByUser = async (artWorkID) => {
        try {
            // check if artwork exist
            const artWorkDetail = await artworkModel.findById(artWorkID);
            const imageURL = await this.createSignedUrlDetail(artWorkDetail.imageURL);
            // download image
            // await supabase
            //     .storage
            //     .from('SDN')
            //     .download(artWorkDetail.imageURL)
            return imageURL
        } catch (error) {
            throw error
        }
    }
}

// const downloadImage = async (req, res) => {}

module.exports = UploadService;
