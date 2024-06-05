const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes/index.js');
const errorHandler = require('errorhandler');
require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
// Récupère les assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// Gère les requetes de type "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));
app.use(index);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
    // Creation d'un middleware d'erreur
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        })
    });
}

app.listen(port);

