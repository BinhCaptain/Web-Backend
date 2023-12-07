const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

// POST endpoint for user registration
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validate input parameters here if needed
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email already exists
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.error('Error checking availability:', err);
            return res.status(500).json({ message: 'Error registering the user.' });
        }

        // Check if email is already taken
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash the password before saving it to the database
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error hashing the password:', err);
                return res.status(500).json({ message: 'Error registering the user.' });
            }

            // Save the new user with the hashed password
            db.query(
                'INSERT INTO user (name, password, email) VALUES (?, ?, ?)',
                [name, hash, email],
                (err, result) => {
                    if (err) {
                        console.error('Error registering the user:', err);
                        return res.status(500).json({ message: 'Error registering the user.' });
                    }
                    res.status(201).json({ message: 'User successfully registered.', userId: result.insertId });
                }
            );
        });
    });
});

module.exports = router;
