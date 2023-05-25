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

// calling express
const app = express();

// calling port
const PORT = process.env.PORT || 3001;