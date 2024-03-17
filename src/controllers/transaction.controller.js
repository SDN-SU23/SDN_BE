'use strict'

const TransactionService = require('../services/transaction.service');

class TransactionController {
    withDraw = async (req, res) => {
        try {
            const response = await TransactionService.withdraw(req.body);
            return res.status(200).json({
                message: 'Withdraw successfully',
                result: response
            });
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

    getListTransactionByCreator = async (req, res) => {
        try {
            const response = await TransactionService.getListTransactionByCreator(req.query, req.params.creatorId);
            return res.status(200).json({
                message: 'Get list transaction by creator successfully',
                result: response
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // getListWithdrawByAdmin = async (req, res) => {
    //     try {
    //         const response = await TransactionService.getListWithdrawByAdmin(req.query);
    //         return res.status(200).json(response);
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message });
    //     }
    // }

    // getListWithdrawByUser = async (req, res) => {
    //     try {
    //         const response = await TransactionService.getListWithdrawByUser(req.query, req.params.userId);
    //         return res.status(200).json(response);
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message });
    //     }
    // }

    updateWithdrawStatus = async (req, res) => {
        try {
            const response = await TransactionService.updateWithdrawStatus(req.params.id, req.body.status);
            return res.status(200).json({
                message: 'Update withdraw status successfully',
                result: response
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TransactionController();