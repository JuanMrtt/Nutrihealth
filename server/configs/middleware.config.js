const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon');
const flash = require("connect-flash");
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');
const express = require('express')
const cors = require('cors')




module.exports = app => {


    const app_name = require('../package.json').name;
    const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


    // Middleware Setup
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(flash());


    // Express View engine setup

    app.use(require('node-sass-middleware')({
        src: path.join(__dirname, '..', 'public'),
        dest: path.join(__dirname, '..', 'public'),
        sourceMap: true
    }));

    const whitelist = ['http://localhost:3000', 'http://localhost:5000', '*']
    const corsOptions = {
        origin: (origin, cb) => {
            const originWhitelisted = whitelist.includes(origin)
            cb(null, originWhitelisted)
        },
        credentials: true
    }
    app.use(cors(corsOptions))


    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'hbs');
    app.use(express.static(path.join(__dirname, '..', 'public')));



    hbs.registerHelper('ifUndefined', (value, options) => {
        if (arguments.length < 2)
            throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
        if (typeof value !== undefined) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

}