// Initialize router using user and blogpost routes
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogpostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;