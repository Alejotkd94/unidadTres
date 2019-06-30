const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const cusoxusuarioSchema = new Schema({
    idUsuario: {
        type: String,
        require: true,
        trim: true
    },
    idCurso: {
        type: String,
        require: true,
        trim: true,
    }
});

cusoxusuarioSchema.plugin(uniqueValidator);

const CursoxUsuario = mongoose.model('CursoxUsuario', cusoxusuarioSchema);

module.exports = CursoxUsuario;