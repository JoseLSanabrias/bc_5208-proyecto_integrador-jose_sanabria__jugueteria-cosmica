/*=====================================================================================================================
=                                            Requerir dependencias instaladas                                         =
=====================================================================================================================*/

//  Mongoose 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//  Dotenv
require("dotenv").config();

/*===================================  End of Requerir dependencias instaladas  ====================================*/

const setupDB = async () => {
    try{ 
        await mongoose
        .connect(process.env.MONGODB_URI)
        console.log('MongoDB Atlas is connected')
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = setupDB;