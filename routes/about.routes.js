/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

/* Express */
const express = require('express');



/* Seteo Router
------------------------------------------------------------------------------------------------------------------- */
const router = express.Router();
/* End of Seteo Router
------------------------------------------------------------------------------------------------------------------- */

/*===================================  End of Requerir dependencias instaladas  ====================================*/

const pagePath = `../pages/about-us.ejs`;

/* Obtención Data
------------------------------------------------------------------------------------------------------------------- */
router.get('/', async(req, res) => {
    res.render('pages/index', {
        pagePath : pagePath,
    });
});

/* End of Obtención Data
------------------------------------------------------------------------------------------------------------------- */



module.exports = router;