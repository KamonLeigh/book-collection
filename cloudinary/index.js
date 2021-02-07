const cloundinary = require('cloudinary').v2;
const { CloudinaryStorage} = require('multer-storage-cloudinary');

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: process.env.CLOUDINARY_CLOUD_NAME,
    allowedFormats:['jpeg', 'png', 'jpg']
});

module.exports = {
    cloudinary,
    storage
}