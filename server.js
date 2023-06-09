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
        // Session will automatically expire in 10 minutes
        maxAge: 600000,
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

// using session and handlebars, express json, urlencoded, static, and routes
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// syncing sequelize and listening to PORT
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT + '/'));
});




