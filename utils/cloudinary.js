/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

/* Cloudinary */
const cloudinary = require("cloudinary");

/*===================================  End of Requerir dependencias instaladas  ====================================*/


// Cloudinary configuration --> tomada de archivo "BLOG" desarrollado por Juan Manuel Perez Arguelles
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
