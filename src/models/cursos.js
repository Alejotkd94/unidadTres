const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const cursosSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    idCurso: {
        type: String,
        require: true,
        trim: true,
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    valor: {
        type: Number,
        require: true
    },
    modalidad: {
        type: String,
        default: 0
    },
    intensidadHoraria: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

cursosSchema.plugin(uniqueValidator);

const Cursos = mongoose.model('Cursos', cursosSchema);

module.exports = Cursos;