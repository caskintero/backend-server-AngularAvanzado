var express = require('express');

var app = express();

// ===============================
//		Peticion principal
// ===============================
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

module.exports = app;