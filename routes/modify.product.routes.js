/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

/* Express */
const express = require('express');

/* Modelo de objeto */
const Toy = require('../models/toy');

//Seteo Router
const router = express.Router();

// Cloudinary y lectura de fotos
const cloudinary = require('../utils/cloudinary');


/*===================================  End of Requerir dependencias instaladas  ====================================*/

//  Configuracion del verbo DELETE
router.delete('/:id', async (req, res) => {
    try {
        let toy = await Toy.findById(req.params.id);;

        // Eliminar array de fotos del servidor cloudinary
        await cloudinary.v2.api.delete_resources([toy.cloudinary_ids[0], toy.cloudinary_ids[1], toy.cloudinary_ids[2], toy.cloudinary_ids[3],]);

        // Eliminar juguete de MongoDB
        await toy.remove();

        res.redirect('/home');

    } catch (error) {
    console.log(error.message);
    }
});



const pagePath = `../pages/edit-product`;

//  Configuracion del verbo PUT
router.put('/:id', async(req, res) => {
    try {
        let toy = await Toy.findById(req.params.id);;
        
        res.render('pages/index', { 
            toy: toy,
            pagePath: pagePath,
        });

    } catch (error) {
    console.log(error.message);
    }
});

module.exports = router;