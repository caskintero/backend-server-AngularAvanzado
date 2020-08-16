// Requires
var express = require('express');
var mongoose = require('mongoose');

// Conexion con la DB en este caso MongoDB

mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, resp) => {

    if (err) throw err;
    console.log('Base de datos, puerto 27017: \x1b[32m%s\x1b[0m', 'Online');

});

// inicializar variables

var app = express()

// rutas


app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


//escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
})