/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

const multer = require('multer');
const path = require('path');

/*===================================  End of Requerir dependencias instaladas  ====================================*/


// Multer configuration --> tomada de archivo blog desarrollado por Juan Manuel Perez Arguelles
module.exports = multer({
    storage: multer.diskStorage({
        /*
            Se determina una ruta dentro del directorio public, en donde van a quedar almacenadas las imágenes 
            cargadas desde el cliente
        */
        destination: path.join(__dirname, '../public/uploads'),
        /*
            Para poder organizar mejor dichas imágenes adicionadas al directorio 'uploads', se le define un nombre
            único a cada uno por medio de instanciar el objeto 'Date' con su método 'getTime()' el cual obtiene
            la fecha en milisegundos. A este valor obtenido se le concatena por medio de 'template strings' 
            la extencion que trae cada archivo, extraida por medio del método '.extname()' del objeto 'path' 
        */
        filename: (req, file, cb) => {
            cb(null, `${new Date().getTime()}${path.extname(file.originalname)}`);
        }
    }),
    /*
        Se declara la función 'cb' (callback) con un valor booleano para indicar si el archivo recibido deba o no ser aceptado
    */
    fileFilter: (req, file, cb) => {
        let fileExtension = path.extname(file.originalname);

        // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
        if (fileExtension !== '.jpg' && fileExtension !== '.jpeg' && fileExtension !== '.png') {
            cb(new Error('El tipo de archivo no es permitido'), false);
            return;
        }

        // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
        cb(null, true);
    },
});