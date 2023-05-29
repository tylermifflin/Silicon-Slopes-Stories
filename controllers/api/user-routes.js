// Purpose: user routes, login, logout, signup, 
const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try { 
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email' });
            return;
        }
