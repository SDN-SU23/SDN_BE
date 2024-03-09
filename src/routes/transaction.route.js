const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.get('/:userId', transactionController.getListTransactionByUserId);
router.post('/withdraw', transactionController.withDraw);

module.exports = router