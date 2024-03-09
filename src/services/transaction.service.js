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

    static getListTransactionByUserId = async (query, userId) => {
        try {
            const response = await transactionModel
                .find({ senderId: userId })
                .limit(query.pageSize)
                .skip((query.currentPage - 1) * query.pageSize);
            // count total page
            const totalPage = Math.ceil(response.length / query.pageSize);
            return {
                response,
                totalPage,
                pageSize: query.pageSize,
                currentPage: query.currentPage,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = TransactionService;