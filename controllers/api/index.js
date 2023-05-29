// Initialize router using user and blogpost routes
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogpostRoutes = require('./blogpost-routes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;