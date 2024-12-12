const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

module.exports = {
    dbConnection
}