// Initialize express router, using Blogpost 
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/blogposts
router.post ('/', withAuth, async (req, res) => {
    try {
        const newBlogpost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT /api/blogposts/1 -- update blogpost, or add a comment to an existing blogpost
router.put('/:id', withAuth, async (req, res) => {
    try { 
        const blogpostData = await BlogPost.update({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(blogpostData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// DELETE /api/blogposts/1 -- only user who posted the blogpost can delete it
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!blogpostData) {
            res.status(404).json({ message: 'Blogpost does not exist with this id' });
            return;
        }
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

