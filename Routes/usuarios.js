var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutentificacion = require('../middlewares/autenticacion');

var Usuario = require('../Models/usuario');

var app = express();

// ===============================
//		LISTAR USUARIOS
// ===============================
app.get('/', (err, res, next) => {

    Usuario.find({}, 'nombre email img role').exec(
        (error, usuarios) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error en la busqueda de usuarios en la DataBase',
                    errors: error
                });
            }
            res.status(200).json({
                ok: true,
                usuarios
            });
        }
    );
});



// ===============================
//		Actualizar Usuarios
// ===============================
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                erros: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se pudo encontrar al usuario con id ' + id,
                errors: { message: 'No existe usuario con este ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario no se pudo actualizar',
                    errors: err
                });
            }
            usuarioGuardado.password = '=)';
            res.status(200).json({
                ok: true,
                mensaje: 'Actualizado con exito',
                usuario: usuarioGuardado
            });
        });
    });
});

// ===============================
//		INICIO DE CREAR USUARIO
// ===============================

app.post('/', mdAutentificacion.verificarToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password),
        img: body.img,
        role: body.role
    });

    usuario.save((error, usuarioGuardado) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar usuario',
                errors: error
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Guardado con exito',
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
});

// ===============================
//		Borrar usuario
// ===============================

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + ' No pudo ser borrado',
                errors: { message: 'El id no existe' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});

module.exports = app;