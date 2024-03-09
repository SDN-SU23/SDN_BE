const express = require('express');
const router = express.Router();
const reactController = require('../controllers/react.controller');

router.post('/', reactController.createNewReact);
router.delete('/', reactController.deleteReact);

module.exports = router;