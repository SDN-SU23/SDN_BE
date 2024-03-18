'use strict'

const transactionModel = require('../models/transaction.model');
const artworkModel = require('../models/artwork.model');
const userModel = require('../models/user.model');

class TransactionService {

    static withdraw = async (detail) => {
        try {
            // get detail senderId 
            const sender = await userModel.findById(detail.senderId);
            // check wallet
            if (sender.wallet < detail.amount) {
                throw new Error('Your wallet is not enough to withdraw');
            }
            const response = await transactionModel.create({
                type: 'withdraw',
                amount: detail.amount,
                senderId: detail.senderId,
                content: detail.content,
                status: 'pending'
            });
            // send notification to admin
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static getListTransactionByUserId = async (query, userId) => {
        try {
            let filter = {};
            if (query.type) {
                filter.type = query.type;
            }
            filter.senderId = userId;

            const response = await transactionModel
                .find(filter)
                .limit(query.pageSize)
                .skip((query.currentPage - 1) * query.pageSize)
                .populate('senderId', 'name')
                .sort({ createdAt: -1 })
                .lean();
            // count total page
            const totalPage = Math.ceil(await transactionModel.countDocuments(filter) / query.pageSize);
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

    static getListTransaction = async (query) => {
        try {
            console.log(JSON.stringify(query));
            let filter = {};
            if (query.type) {
                filter.type = query.type;
            }
            const response = await transactionModel
                .find(filter)
                .limit(query.pageSize)
                .skip((query.currentPage - 1) * query.pageSize)
                .populate('senderId', 'name')
                .populate('artworkId')
                .sort({ createdAt: -1 })
                .lean();
            // count total page
            const totalPage = Math.ceil(await transactionModel.countDocuments(filter) / query.pageSize);
            return {
                response,
                totalPage: totalPage,
                pageSize: query.pageSize,
                currentPage: query.currentPage,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static getListTransactionByCreator = async (query, creatorId) => {
        try {
            const listArtWork = await artworkModel.find({ authorId: creatorId }).lean();
            // find transaction by artworkId
            let listTransaction = [];
            for (let i = 0; i < listArtWork.length; i++) {
                const transaction = await transactionModel
                    .find({ artworkId: listArtWork[i]._id })
                    .populate('senderId')
                    .populate('artworkId')
                    .sort({ createdAt: -1 })
                    .lean();
                listTransaction = listTransaction.concat(transaction);
            }
            // map data 
            const result = listTransaction.map((item) => {
                return {
                    buyer_name: item.senderId.name,
                    artwork_title: item.artworkId.title,
                    amount: item.amount,
                    createdAt: item.createdAt,
                    status: item.status
                }
            })
            return {
                result,
                pageSize: query.pageSize,
                currentPage: query.currentPage,
                totalPage: Math.ceil(listTransaction.length / query.pageSize)
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // static getListWithdrawByAdmin = async (query) => {
    //     try {
    //         const result = await transactionModel
    //             .find({ type: 'withdraw' })
    //             .limit(query.pageSize)
    //             .skip((query.currentPage - 1) * query.pageSize)
    //             .populate('senderId', 'name')
    //             .sort({ createdAt: -1 })
    //             .lean();
    //         // count total page
    //         const totalPage = Math.ceil(await transactionModel.countDocuments({ type: 'withdraw' }) / query.pageSize);
    //         return {
    //             result,
    //             totalPage,
    //             pageSize: query.pageSize,
    //             currentPage: query.currentPage,
    //         };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static getListWithdrawByUser = async (query, senderId) => {
    //     try {
    //         const result = await transactionModel
    //             .find({ type: 'withdraw', senderId: senderId })
    //             .limit(query.pageSize)
    //             .skip((query.currentPage - 1) * query.pageSize)
    //             .populate('senderId')
    //             .sort({ createdAt: -1 })
    //             .lean();
    //         // count total page
    //         const totalPage = Math.ceil(await transactionModel.countDocuments({ type: 'withdraw' }) / query.pageSize);
    //         return {
    //             result,
    //             totalPage,
    //             pageSize: query.pageSize,
    //             currentPage: query.currentPage,
    //         };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    static updateWithdrawStatus = async (id, status) => {
        try {
            const transaction = await transactionModel.findById(id);
            if (transaction.type !== 'withdraw') {
                throw new Error(`This transaction can't edit `);
            }
            // update status
            const update = await transactionModel.findByIdAndUpdate(id, { status: status });
            return update;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = TransactionService;