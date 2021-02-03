const express = require('express');
const { home } = require('../controllers/home')

const router = new express.Router();
router.get('/', home);

module.exports = router;