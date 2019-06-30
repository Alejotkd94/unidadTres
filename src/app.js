//Requires
require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//para variable de session
const session = require('express-session');
var MemoryStore = require('memorystore')(session)

//Helpers
require('./helpers/helpers');

//Paths
const dirPublic = path.join(__dirname, "../public");
const dirViews = path.join(__dirname, '../template/views');
const dirPartials = path.join(__dirname, '../template/partials');
const dirNode_modules = path.join(__dirname, '../node_modules');

//Static
app.use(express.static(dirPublic))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

//Configuracion de las variables de session
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// Uso variables de session
app.use((req, res, next) => {
    if (req.session.idUser) {
        res.locals.session = true;
        res.locals.nombre = req.session.nombre;
        res.locals.idUser = req.session.idUser;
        res.locals.rol = req.session.rol;
    }
    next();
});

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));

//Conexion base de datos
mongoose.connect(process.env.URLBD, { useNewUrlParser: true }, (err, result) => {
    if (err) {
        return console.log(err);
    }
    console.log('Conectado a la base de datos');
});

app.listen(process.env.PORT, () => {
    console.log('servidor en el puerto: ' + process.env.PORT)
});