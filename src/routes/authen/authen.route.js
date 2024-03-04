const express = require('express');
const authenController = require('../../controllers/authen.controller');
const router = express.Router();
const passport = require('../../configs/passport.config');

router.post('/login', authenController.login);
module.exports = router