/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

/* Express */
const express = require('express');

/* Modelo de objeto */
const Toy = require('../models/toy');


/* Seteo Router
------------------------------------------------------------------------------------------------------------------- */
const router = express.Router();
/* End of Seteo Router
------------------------------------------------------------------------------------------------------------------- */

/*===================================  End of Requerir dependencias instaladas  ====================================*/

const pagePath = `../pages/home.ejs`;


// Obtención juguete de base de datos
router.get('/', async(req, res) => {
    const toys = await Toy.find().sort({
        createAt: 'desc',
    });
    res.render('pages/index', {
        toys: toys,
        pagePath : pagePath,
    });
});




module.exports = router;