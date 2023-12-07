const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST endpoint for user registration
router.post('/register', loginController.register);

module.exports = router;
