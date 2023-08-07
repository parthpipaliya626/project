const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Pool setup and configuration (similar to previous steps)

// Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
        const values = [email, hashedPassword];

        await pool.query(insertQuery, values);
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('An error occurred.');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const selectQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(selectQuery, [email]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                req.session.user = user; // Store user data in session
                res.redirect('/dashboard');
            } else {
                res.render('login', { error: 'Invalid credentials' });
            }
        } else {
            res.render('login', { error: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred.');
    }
});

// Dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/auth/login');
    }
});


// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
