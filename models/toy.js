/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

/* Mongoose */
const mongoose = require('mongoose');



/* Satinizado y seguridad de inserciones
-------------------------------------------------------------------------------------------------------------------- */
/* Marcado */
const {marked} = require('marked');

/* Emulación de subconjuntos de un navegador web */
const {JSDOM} = require('jsdom');

/* Purificador del DOM */
const createDOMPurify = require('dompurify');
const domPurify = createDOMPurify(new JSDOM().window);

/* End of Satinizado y seguridad de inserciones
-------------------------------------------------------------------------------------------------------------------- */


/* Eliminación de caracteres especiales en las inserciones */
const slugify = require('slugify');

/*===================================  End of Requerir dependencias instaladas  ====================================*/





/*=====================================================================================================================
=                                          Armado de esquemas para base de datos                                      =
=====================================================================================================================*/

const toySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fee:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    'short-description': {
        type: String,
        required: true,
    },
    'long-description': {
        type: String,
        required: true,
    },
    freeShipment:{
        type: Boolean,
        required: true,
    },
    ageRange:{
        type: Number,
        required: true,
    },
    ageBgColor:{
        type: String,
        required: false,
    },
    photos:{
        type: [String],
        required: true,
    },
    cloudinary_ids:{
        type: [String],
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    ratingImage : {
        type: String,
        required: false,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    sanitizedHtml:{
        type: String,
        required: true,
    }
});

/*==================================  End of Armado de esquemas para base de datos  ===================================*/



/* Uso de middleware para validar el contenido ingresado por el usuario
---------------------------------------------------------------------------------------------------------------------- */

toySchema.pre('validate', function (next) {

    /* Definir imagen a usar en el rango del producto
    -------------------------------------------------- */
    let nStars;
    
    if(this.rating < 3.4){
        nStars = '3';
    }else if (this.rating < 3.9){
        nStars = '3.5';
    }else if (this.rating < 4.4){
        nStars = '4';
    }else if (this.rating < 4.9){
        nStars = '4.5';
    }else {
        nStars = '5';
    }
    
    this.ratingImage = nStars;
    /* End of Definir imagen a usar en el rango del producto
    -------------------------------------------------- */


    /* Definir el color de fondo de la card dependiendo el rango de edad
    -------------------------------------------------- */
    const ageBgColors = [
        'card__content--age-0-2',
        'card__content--age-3-4',
        'card__content--age-5-7',
        'card__content--age-8-13',
        'card__content--age-14',
    ];

    let assignedBGColor;
    
    for(let i = 0; i < ageBgColors.length; i++){
        if((i + 1) === this.ageRange) {
            assignedBGColor = ageBgColors[i];
        }
    }

    this.ageBgColor = assignedBGColor;
    /* End of Definir el color de fondo de la card dependiendo el rango de edad
    -------------------------------------------------- */

    /*  Uso de middleware para validar el contenido 
        ingresado por el usuario
    -------------------------------------------------- */
    if(this.title){
        this.slug = slugify(this.title, {
            /* 
                convertir a minúscula lo que se ingrese en el valor de la propiedad
            */
            lower: true,
            /* 
                borrar caracteres especiales
            */
            strict: true,
        });
    }
    if(this['short-description']) {
        this.sanitizedHtml = domPurify.sanitize(marked(this['short-description']))
    };
    /*  End of Uso de middleware para validar el 
        contenido ingresado por el usuario
    -------------------------------------------------- */

    next();
});


/* End of Uso de middleware
---------------------------------------------------------------------------------------------------------------------- */


module.exports = mongoose.model('toy', toySchema);