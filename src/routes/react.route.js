const express = require('express');
const router = express.Router();
const reactController = require('../controllers/react.controller');

router.post('/', reactController.createNewReact);

module.exports = router;