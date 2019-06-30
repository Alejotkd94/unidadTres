const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    docIdentidad: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    correo: {
        type: String,
        require: true,
        trim: true,
    },
    telefono: {
        type: String,
        require: true,
        trim: true,
    },
    rol: {
        //Aspirante : 1, coordinador : 2
        type: Number,
        default: 1,
    },
    usuario: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    }
});

usuariosSchema.plugin(uniqueValidator);

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

module.exports = Usuarios;