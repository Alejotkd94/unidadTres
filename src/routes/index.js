const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Vistas y vistas parciales
const dirViews = path.join(__dirname, '../../template/views');
const dirPartials = path.join(__dirname, '../../template/partials');

//Helpers
require('.././helpers/helpers');

//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

//Modelos 
const Usuarios = require('.././models/usuarios');
const Cursos = require('.././models/cursos');
const CursoxUsuario = require('.././models/cursoxusuario');

//Home
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Inicio'
    });
});

//Mostrar vista Registrar usuario
app.get('/registrar', (req, res) => {
    res.render('registrar', {
        titulo: 'Registro'
    });
});

//Registrar usuario
app.post('/registrar', (req, res) => {
    try {
        Usuarios.find({ docIdentidad: req.body.docIdentidad }).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/registrar',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                let usuario = new Usuarios({
                    docIdentidad: req.body.docIdentidad,
                    nombre: req.body.nombre,
                    correo: req.body.email,
                    telefono: req.body.telefono,
                    usuario: req.body.usuario,
                    password: bcrypt.hashSync(req.body.password, 10),
                });

                //Se almacena en la bd
                usuario.save((err, result) => {
                    if (!err) {
                        res.render('exito', {
                            mensaje: 'El usuario ' + result.nombre + ' se creo correctamente.',
                            regresar: '/registrar',
                            titulo: "Valido"
                        });
                    }

                    res.render('error', {
                        mensaje: 'Se presento un error en la aplicación:' + err,
                        regresar: '/registrar',
                        titulo: "Error"
                    });
                });
            } else {
                res.render('error', {
                    mensaje: 'Ya existe un usuario con el documento : ' + req.body.docIdentidad,
                    regresar: '/registrar',
                    titulo: "Error"
                });
            }
        });
    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/registrar',
            titulo: "Error"
        });
    }
});

//Mostrar vista Registrar curso
app.get('/crearCurso', (req, res) => {
    res.render('crearCurso', {
        titulo: 'Curso'
    });
});

//Registrar curso
app.post('/RegistarCurso', (req, res) => {
    try {
        Cursos.find({ idCurso: req.body.idCurso }).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/crearCurso',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                let curso = new Cursos({
                    idCurso: req.body.idCurso,
                    modalidad: req.body.modalidad,
                    valor: req.body.valor,
                    descripcion: req.body.descripcion,
                    intensidadHoraria: req.body.intensidadHoraria,
                    nombre: req.body.nombreCurso
                });

                //Se almacena en la bd
                curso.save((err, result) => {
                    if (!err) {
                        res.render('exito', {
                            mensaje: 'El curso ' + result.nombre + ' se creo correctamente.',
                            regresar: '/crearCurso',
                            titulo: "Valido"
                        });
                    }

                    res.render('error', {
                        mensaje: 'Se presento un error en la aplicación:' + err,
                        regresar: '/crearCurso',
                        titulo: "Error"
                    });
                });
            } else {
                res.render('error', {
                    mensaje: 'Ya existe un curso con el id : ' + req.body.idCurso,
                    regresar: '/crearCurso',
                    titulo: "Error"
                });
            }
        });
    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/crearCurso',
            titulo: "Error"
        });
    }
});

//Listar cursos disponibles
app.get('/litarCursos', (req, res) => {
    try {
        Cursos.find({}).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                res.render('error', {
                    mensaje: 'No existen cursos disponibles',
                    regresar: '/',
                    titulo: "Error"
                });

            } else {
                res.render('listarCurso', {
                    listado: result,
                    titulo: "Cursos"
                });
            }
        });

    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/',
            titulo: "Error"
        });
    }
});

//Mostrar vista Inscripcion curso
app.get('/inscribir', (req, res) => {
    try {
        Cursos.find({}).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                res.render('error', {
                    mensaje: 'No existen cursos disponibles',
                    regresar: '/',
                    titulo: "Error"
                });

            } else {
                res.render('inscribirCurso', {
                    listado: result,
                    titulo: "Inscripción"
                });
            }
        });
    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/',
            titulo: "Error"
        });
    }
});

//Registrar curso
app.post('/InscribirCurso', (req, res) => {
    try {
        CursoxUsuario.find({ idCurso: req.body.idCurso }).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/inscribir',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                let cursoxusuario = new CursoxUsuario({
                    idCurso: req.body.idCurso,
                    idUsuario: req.session.idUser
                });

                //Se almacena en la bd
                cursoxusuario.save((err, result) => {
                    if (!err) {
                        res.render('exito', {
                            mensaje: 'El registro se creo correctamente.',
                            regresar: '/inscribir',
                            titulo: "Valido"
                        });
                    }

                    res.render('error', {
                        mensaje: 'Se presento un error en la aplicación:' + err,
                        regresar: '/inscribir',
                        titulo: "Error"
                    });
                });
            } else {
                res.render('error', {
                    mensaje: 'Uste ya se encuentra registrado en este curso.',
                    regresar: '/inscribir',
                    titulo: "Error"
                });
            }
        });
    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/inscribir',
            titulo: "Error"
        });
    }
});

//Listar cursos con aspirantes
app.get('/listarInsctritos', (req, res) => {
    try {
        Cursos.find({}).exec((err, result) => {
            if (err) {
                res.render('error', {
                    mensaje: 'Se presento un error en la aplicación:' + err,
                    regresar: '/',
                    titulo: "Error"
                });
            }

            if (result.length === 0) {
                res.render('error', {
                    mensaje: 'No existen cursos disponibles',
                    regresar: '/',
                    titulo: "Error"
                });

            } else {
                CursoxUsuario.find({}).exec((err, resultUser) => {
                    if (err) {
                        res.render('error', {
                            mensaje: 'Se presento un error en la aplicación:' + err,
                            regresar: '/',
                            titulo: "Error"
                        });
                    }

                    if (resultUser.length === 0) {
                        res.render('error', {
                            mensaje: 'No existen usuarios inscritos',
                            regresar: '/',
                            titulo: "Error"
                        });

                    } else {
                        Usuarios.find({}).exec((err, resultUsuarios) => {
                            if (err) {
                                res.render('error', {
                                    mensaje: 'Se presento un error en la aplicación:' + err,
                                    regresar: '/',
                                    titulo: "Error"
                                });
                            }

                            if (resultUsuarios.length === 0) {
                                res.render('error', {
                                    mensaje: 'No existen usuarios inscritos',
                                    regresar: '/',
                                    titulo: "Error"
                                });

                            } else {
                                res.render('listarInscritos', {
                                    listado: result,
                                    listadouser: resultUser,
                                    usuarios: resultUsuarios,
                                    titulo: "Inscriptos"
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/',
            titulo: "Error"
        });
    }
});

//Eliminar inscripto
app.post('/eliminarAspirante', (req, res) => {

    CursoxUsuario.findOneAndDelete({ idCurso: req.body.idCurso, idUsuario: req.body.docIdentidad }, req.body, (err, result) => {
        if (err) {
            res.render('error', {
                mensaje: 'Se presento un error en la aplicación:' + err,
                regresar: '/',
                titulo: "Error"
            });
        }

        //si no encontro un regitro para eliminar
        if (!result) {
            res.render('error', {
                mensaje: 'No se encontro el aspirante ha eliminar.',
                regresar: '/',
                titulo: "Error"
            });
        }

        res.redirect('/listarInsctritos');
    });
});

//Cerrar curso
app.post('/CerrarCurso', (req, res) => {
    let est = true;
    if (req.body.estado === 'true') {
        est = false;
    }

    console.log(req.body.estado);

    Cursos.findOneAndUpdate({ idCurso: req.body.idCurso }, { $set: { estado: est } }, { new: true }, (err, result) => {
        if (err) {
            res.render('error', {
                mensaje: 'Se presento un error en la aplicación:' + err,
                regresar: '/listarInsctritos',
                titulo: "Error"
            });
        }

        if (req.body.estado === 'true') {
            res.render('exito', {
                mensaje: 'El curso ' + result.nombre + ' se cerro correctamente.',
                regresar: '/listarInsctritos',
                titulo: "Valido"
            });
        } else {
            res.render('exito', {
                mensaje: 'El curso ' + result.nombre + ' se abrio correctamente.',
                regresar: '/listarInsctritos',
                titulo: "Valido"
            });
        }
    });
});

//Ingresar a la aplicacion
app.post('/ingresar', (req, res) => {
    try {
        Usuarios.findOne({ usuario: req.body.usuario }, (err, resultados) => {
            if (err) {
                return res.render('error', {
                    mensaje: 'Se presento un error en la aplicación: ' + err,
                    regresar: '/',
                    titulo: "Error"
                });
            }

            if (resultados) {

                if (!bcrypt.compareSync(req.body.password, resultados.password)) {

                    return res.render('error', {
                        mensaje: 'El usuario y/o la contraseña son incorrectos.',
                        regresar: '/',
                        titulo: "Error"
                    });
                }
                //Para crear las variables de sesión
                req.session.nombre = resultados.nombre;
                let aspirante = false;
                if (resultados.rol === 1) {
                    aspirante = true;
                } else {
                    aspirante = false;
                }
                req.session.rol = aspirante;
                req.session.idUser = resultados._id;

                res.render('exito', {
                    mensaje: 'Bienvenido ' + resultados.nombre + ' a la plataforma.',
                    regresar: '/',
                    titulo: "Valido",
                    session: true,
                    rol: aspirante,
                    nombre: resultados.nombre
                });
            } else {
                return res.render('error', {
                    mensaje: 'El usuario y/o la contraseña son incorrectos.',
                    regresar: '/',
                    titulo: "Error"
                });
            }
        });
    } catch (error) {
        return res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + error,
            regresar: '/',
            titulo: "Error"
        });
    }
});

//Salir de la aplicacion
app.get('/salir', (req, res) => {
    req.session.destroy((err) => {
        res.render('error', {
            mensaje: 'Se presento un error en la aplicación: ' + err,
            regresar: '/',
            titulo: "Error"
        });
    });

    res.redirect('/');
})

//Error
app.get('*', (req, res) => {
    res.render('error', {
        titulo: "Error",
        regresar: '/'
    })
});

module.exports = app;