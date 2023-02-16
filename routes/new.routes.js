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

router.get('/', async(req, res) => {
    res.render('pages/index', {
        toy: new Toy(),
        pagePath : pagePath,
    });
});


const cloudinaryImageUploadMethod = async  file => {
    return new Promise (resolve => {
        cloudinary.uploader.upload(file, res => {
            resolve({
                res: res.secure_url,
            });;
        });
    })
}

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

        // Crear Nuevo Juguete
        let toy = new Toy({
            title: req.body.title,
            fee: req.body.fee,
            'stock': req.body.stock,
            'brand': req.body.brand,
            'category': req.body.category,
            'short-description': req.body['short-description'],
            'long-description': req.body['long-description'],
            freeShipment: req.body.freeShipment,
            ageRange:req.body.ageRange,
            'photos': urls.map(url => url.res),
            cloudinary_id: files.public_id,
            'rating': 4,
            ageBgColor: req.body.ageBgColor,
        });
        
        // Guardamos articulo en MongoDB

        await toy.save();
        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }
});


module.exports = router;