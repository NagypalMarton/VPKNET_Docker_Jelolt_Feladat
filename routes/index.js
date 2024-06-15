const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Főoldal route
router.get('/', homeController.index);

module.exports = router;
