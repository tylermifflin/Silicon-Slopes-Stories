// Initialize router, using homeRoutes, apiRoutes and using them with router.use()
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');