'use strict'

const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: global.config.cloud.name,
    api_key: global.config.cloud.api_key,
    api_secret: global.config.cloud.api_secret
});

// Log the configuration
// console.log(cloudinary.config());

module.exports = cloudinary;