/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/


/*
    Dotenv
    Dependencia de nodeJs que le permite trabajar con variables de entorno

    Ya que el manejo de variables de entorno por medio del módulo dotenv es funcional unicamente dentro del entrono
    de desarrollo (debido que al momento de producción y subir el proyecto a un hosting, este tiene sus propios campos
    para definir las variables de entorno); se puede condicionar la configuración del mismo unicamente a cuando se
    esté trabajando en un entorno de desarrollo.

    Para saber el entorno actual en el que se está trabajando dentro del proyecto, se utiliza "NODE_ENV", el cual por
    defecto tiene asignado un dato de tipo 'undefined'; por lo que debe definirse por medio de las variables de entorno
    (archivo .env)

    Cross-env
    Modulo de nodeJs que permite definir el entorno de desarrollo en múltiples plataformas
*/
if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
/* 
    Express
*/
const express = require('express');
const app = express();
/* 
    Motor de plantilla(renderizado de vistas) ejs
*/
app.set('view engine', 'ejs');
/*
    'express.json()'
    Método de express que le permite leer e interpretar archivos JSON
*/
app.use(express.json());
/*
    'express.urlencoded()'
    Método de express que permite definir al momento de subir datos desde un formulario la capacidad de express para
    interpretarlos. Es necesario como parámetro definir un objeto con la propiedad extended en false, para permitir
    que express lea tipos de datos como 'number' y/o 'strings'
*/
app.use(express.urlencoded({ extended: false }));
/* 
    Método Override 
    (permite el uso de PUT y DEL por parte del cliente)
*/
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
/*
    Cors
    Middleware que permite el correcto Intercambio de recursos de origen cruzado
*/
const cors = require("cors");
app.use(cors());
/* 
    Seteo del enrutador para el servidor
*/
const routes = require('../routes');
app.use(routes);


/*===================================  End of Requerir dependencias instaladas  ====================================*/

/* 
    Seteo de Mongoose
*/
const setupDB = require('../utils/db');
setupDB();
/* 
    Configuración del puerto del servidor

    (process.env --> objeto de express que permite requerir y trabajar con variables de entorno)
    
    Se define que el puerto sea elegido por la variable de entorno del hosting al momento de subir el contenido, y en caso
    de que no arroje ninguna variable de entorno, trabaje entonces con el puerto 3000
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
/*
    Se llaman a uso todos lo recursos del directorio Public
*/
app.use("/public/", express.static("./public"));
/*
    Lo que se ponga en la URL lo va enviar al home por defecto
*/
app.get('/', async (req, res) => {
    res.redirect('/home');
});