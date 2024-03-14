const express = require('express');
const authenController = require('../controllers/authen.controller');
const router = express.Router();

router.post('/login', authenController.login);

router.post('/register', authenController.register);

router.post('/forgotPassword', authenController.forgotPassword)
module.exports = router