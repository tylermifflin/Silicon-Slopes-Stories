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
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password' });
            return;
        }
        // Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
