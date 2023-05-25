// calling path, express, session, express-handlebars, routes, helpers
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// import sequelize connection
const sequelize = require('./config/connection');

// import sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// calling express and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// using custom helpers
const hbs = exphbs.create({ helpers });

// creating session
const sess = {
    secret: 'Secret',
    cookie: {
        // Session will automatically expire in 1 hour
        maxAge: 3600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

