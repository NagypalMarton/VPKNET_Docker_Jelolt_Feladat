// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Existing route for the user list
router.get('/', userController.getUsers);

// Add a route for the new user form
router.get('/users/new', userController.newUserForm);

module.exports = router;