/*=====================================================================================================================
=                                                      Requerir rutas                                                 =
=====================================================================================================================*/

/*
    Método .Router() de express
    Al asignarlo a un objeto, este permite definir rutas/URL para el servidor sobre el que se está trabajando
*/
const router = require('express').Router();

const homeRoutes = require('./home.routes');
const newRoutes = require('./new.routes');
const favRoutes = require('./favorites.routes');
const contactRoutes = require('./contact.routes');
const aboutUsRoutes = require('./about.routes');
const innerProducts = require('./inner.product.routes');
const modifyProduct = require('./modify.product.routes');

/*============================================  End of Requerir rutas  =============================================*/

// home routes
router.use('/home', homeRoutes);

// new routes
router.use('/product-register', newRoutes);

// favorites routes
router.use('/favorites', favRoutes);

// Contact routes
router.use('/contact', contactRoutes);

// About routes
router.use('/about-us', aboutUsRoutes);

// Inner product routes
router.use('/', innerProducts);

// Delete product route
router.use('/', modifyProduct);




module.exports = router;
