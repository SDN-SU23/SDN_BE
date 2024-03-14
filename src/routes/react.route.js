const express = require('express');
const router = express.Router();
const reactController = require('../controllers/react.controller');
const { checkIsLogin } = require('../auth');

router.use(checkIsLogin)

router.post('/', reactController.createNewReact);

router.delete('/', reactController.deleteReact);

module.exports = router;