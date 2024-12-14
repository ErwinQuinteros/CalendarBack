const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config()

// create server of express
const app = express();

// database
dbConnection();

// directorio publico
app.use( express.static('public') );

// lectura y parseo del body
app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`localhost://${process.env.PORT}`)
})