const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { checkIsLogin, checkRole } = require('../auth');

// router.use(checkIsLogin)

router.get('/getListByUser/:userId', transactionController.getListTransactionByUserId);

router.post('/withdraw', transactionController.withDraw);

// router.use(checkRole('Admin'))

router.get('/getListByAdmin', transactionController.getListTransaction);

router.put('/:transactionId', transactionController.updateTransaction);

module.exports = router