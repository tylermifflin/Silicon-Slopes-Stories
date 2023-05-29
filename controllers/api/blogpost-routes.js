const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/blogposts
router.post ('/', withAuth, async (req, res) => {
    try {
        const newBlogpost = await Blogpost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});