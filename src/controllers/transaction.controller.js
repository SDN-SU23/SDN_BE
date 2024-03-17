'use strict'

const TransactionService = require('../services/transaction.service');

class TransactionController {
    withDraw = async (req, res) => {
        try {
            const response = await TransactionService.withdraw(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getListTransactionByUserId = async (req, res) => {
        try {
            const response = await TransactionService.getListTransactionByUserId(req.query, req.params.userId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getListTransaction = async (req, res) => {
        try {
            const response = await TransactionService.getListTransaction(req.query);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TransactionController();