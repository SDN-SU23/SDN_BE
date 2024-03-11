const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.get('/admin', transactionController.getListTransaction);
router.get('/:userId', transactionController.getListTransactionByUserId);
router.post('/withdraw', transactionController.withDraw);
router.put('/:transactionId', transactionController.updateTransaction);

module.exports = router