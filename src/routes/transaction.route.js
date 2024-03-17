const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { checkIsLogin, checkRole } = require('../auth');

// router.use(checkIsLogin)
router.get('/getListByUser/:userId', transactionController.getListTransactionByUserId);
// request withdraw
router.post('/withdraw', transactionController.withDraw);
// router.use(checkRole('Admin'))
router.get('/getListByAdmin', transactionController.getListTransaction);
// get list withdraw by admin
router.get('/getListWithdrawByAdmin', transactionController.getListWithdrawByAdmin);
// get list withdraw by user
router.get('/getListWithdrawByUser/:userId', transactionController.getListWithdrawByUser);
// upadate withdraw status by admin
router.put('/updateWithdrawStatus/:id', transactionController.updateWithdrawStatus);

module.exports = router