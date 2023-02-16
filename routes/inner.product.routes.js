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

const pagePath = `../pages/inner-product`;

router.get('/:slug', async (req, res) => {
    const toy = await Toy.findOne({ slug: req.params.slug });
    if (toy === null) {
        res.redirect('/home');
    } else {
        res.render('pages/index', { 
            toy: toy,
            pagePath: pagePath,
        });
    }
});

module.exports = router;