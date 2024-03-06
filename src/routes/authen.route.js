const express = require('express');
const authenController = require('../controllers/authen.controller');
const router = express.Router();

router.post('/login', authenController.login);
module.exports = router