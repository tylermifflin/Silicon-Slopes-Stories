const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blog posts for dashboard
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['id','title', 'content','created_at' ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                }
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        // Serialize data so the template can read it and render it to homepage
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one blog post for dashboard and render blogPost page
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            attributes: [ 'id', 'title', 'content', 'created_at' ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogPost = blogPostData.get({ plain: true });
        res.render('blogpost', {
            ...blogPost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// use withAuth middleware to make sure only logged in users can access the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try { 
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
            include: [{ model: Comment }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// if user already logged in, redirect to homepage
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
});

module.exports = router;



