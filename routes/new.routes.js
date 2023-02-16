/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

const express = require('express');
const Toy = require('../models/toy');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

/*===================================  End of Requerir dependencias instaladas  ====================================*/

const pagePath = `../pages/product-register.ejs`;

// Renderizado de la plantilla
router.get('/', async(req, res) => {
    res.render('pages/index', {
        toy: new Toy(),
        pagePath : pagePath,
    });
});



// Función asíncrona para obtener la url segura de cloudinary
const cloudinaryImageUploadMethod = async  file => {
    return new Promise (resolve => {
        cloudinary.uploader.upload(file, res => {
            resolve({
                res: res.secure_url,
                publicId: res.public_id,
            });;
        });
    })
}



//  Posteo de nuevo juguete con array de fotos para carrusel (POST)
router.post('/new', upload.array('photo', 4), async (req, res) => {
    try {
        // Subida de imagen a cloudinary
        const urls = [];
        const files = req.files;
        for(const file of files) {
            const {path} = file;
            const newPath = await cloudinaryImageUploadMethod(path);
            urls.push(newPath);
        };

        const toy = new Toy({
            title: req.body.title,
            fee: req.body.fee,
            stock: req.body.stock,
            brand: req.body.brand,
            category: req.body.category,
            'short-description': req.body['short-description'],
            'long-description': req.body['long-description'],
            freeShipment: req.body.freeShipment,
            ageRange:req.body.ageRange,
            photos: urls.map(url => url.res),
            cloudinary_ids: urls.map( url => url.publicId),
            rating: 4,
            ageBgColor: req.body.ageBgColor,
        });

        // Guardar articulo en MongoDB
        await toy.save();
        res.redirect('/home');

    } catch (error) {
        console.log(error.message);
    }
});


module.exports = router;