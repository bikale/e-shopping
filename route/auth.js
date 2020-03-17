const express = require('express');

const { loginForm, login, logout } = require('../controller/auth');

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
