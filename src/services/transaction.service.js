'use strict'

const transactionModel = require('../models/transaction.model');

class TransactionService {
    static withdraw = async (detail) => {
        try {
            const response = await transactionModel.create({
                type: 'withdraw',
                amount: detail.amount,
                account: detail.account,
            });
            // send notification to admin
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = TransactionService;