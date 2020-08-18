// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Conexion con la DB en este caso MongoDB

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, resp) => {

    if (err) throw err;
    console.log('Base de datos, puerto 27017: \x1b[32m%s\x1b[0m', 'Online');

});

// Importamos las rutas

var appRoutes = require('./Routes/app');
var usuariosRoutes = require('./Routes/usuarios');
var loginRoutes = require('./Routes/login');
// inicializar variables

var app = express();

// definimos body parser

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// rutas
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);




//escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
});