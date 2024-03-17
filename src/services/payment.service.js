'use strict'
const payos = require('../configs/payos.config');
const transactionModel = require('../models/transaction.model');
const time = require('../helpers/timestamp.helper');
const collectionModel = require('../models/collection.model');
const notificationModel = require('../models/notification.model');
const { sendMail } = require('../configs/mail.config');
const { confirmPayment, confirmCreator } = require('../utils/mail.util');
const artworkModel = require('../models/artwork.model');
const userModel = require('../models/user.model');

class PaymentService {
    static createNewOrder = async (accountId, artworkId) => {
        try {
            // get collection detail
            const isBuyed = await collectionModel.findOne({
                authorId: accountId,
                imageId: artworkId
            })
            if (isBuyed) {
                throw new Error('You have already bought this artwork!')
            }
            // get detail artwork
            const artwork = await artworkModel.findOne({
                _id: artworkId
            });
            let amount = artwork.price;
            // create a new transaction 
            const transaction = await transactionModel.create({
                type: 'payArtWork',
                content: 'Thanh toan cho tac pham',
                senderId: accountId,
                artworkId: artworkId,
                amount: amount,
                status: 'pending',
            });

            // generate string random GXXXX (XXXX is number random)
            // create a new order
            const result = await payos.createPaymentLink({
                amount: amount,
                orderCode: Math.floor(Math.random() * 1000) + 1,
                description: "VQRIO123",
                cancelUrl: `${global.config.payos.return_url_fail}/payArtWork/${transaction._id}`,
                returnUrl: `${global.config.payos.return_url}/${transaction._id}`,
                expiredAt: time.addFiveMinuteUnix(),
                signature: 'string',
                items: [],
            })
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    static returnPayArtWorkSuccess = async (transaction_code) => {
        try {
            const transaction = await transactionModel.findOne({
                _id: transaction_code
            });
            // update status
            await transactionModel.findByIdAndUpdate({
                _id: transaction_code
            }, {
                status: 'completed'
            });
            console.log(transaction)
            // create collection
            await collectionModel.create({
                imageId: transaction.artworkId,
                authorId: transaction.senderId,
            })
            // get detail artwork
            const artwork = await artworkModel.findOne({
                _id: transaction.artworkId
            });
            // get detail user 
            const user = await userModel.findOne({
                _id: transaction.senderId
            });
            // get detail author
            const author = await userModel.findOne({
                _id: artwork.authorId
            })
            // update wallet author
            await userModel.findByIdAndUpdate({
                _id: artwork.authorId
            }, {
                wallet: author.wallet + artwork.price
            })
            // create notification
            await notificationModel.create({
                userId: transaction.senderId,
                message: `Bạn đã mua thành công tác phẩm ${artwork.title}`,
            })
            // send mail
            await sendMail({
                userMail: user.email,
                subject: 'Xác nhận thanh toán',
                text: 'Bạn đã thanh toán thành công',
                html: confirmPayment({
                    customer_name: user.name,
                    order_date: time.getNow(),
                    order_number: transaction_code,
                    total_amount: transaction.amount,
                })
            })
            return `http://localhost:5173/done`
        } catch (error) {
            console.log(error)
            throw error;
        }

    }

    static returnPayArtWorkFail = async (transaction_code) => {
        const transaction = await transactionModel.findOne({
            _id: transaction_code
        });
        // update status
        await transactionModel.findByIdAndUpdate({
            _id: transaction_code
        }, {
            status: 'failed'
        });
        return `http://localhost:5173/home`
    }

    static createPaymentUrlRegisterCreator = async (accountId) => {
        try {
            const user = await userModel.findOne({
                _id: accountId
            });
            if (user.role === 'Creator') {
                throw new Error('You are already a creator!')
            }
            const amount = 15000;
            const transaction = await transactionModel.create({
                type: 'registerCreator',
                content: 'Register creator',
                senderId: accountId,
                amount: amount,
                status: 'pending',
            });
            const result = await payos.createPaymentLink({
                amount: amount,
                orderCode: Math.floor(Math.random() * 1000) + 1,
                description: "VQRIO123",
                cancelUrl: `${global.config.payos.return_url_fail}/registerCreator/${transaction._id}`,
                returnUrl: `${global.config.payos.return_url}/registerCreator/${transaction._id}`,
                expiredAt: time.addFiveMinuteUnix(),
                signature: 'string',
                items: [],
            })
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    static returnRegisterCreatorSuccess = async (transaction_code) => {
        try {
            const transaction = await transactionModel.findOne({
                _id: transaction_code
            });
            // update user to creator
            const user = await userModel.findByIdAndUpdate({
                _id: transaction.senderId
            }, {
                role: 'Creator',
                expired_at: time.addOneMonth()
            }
            );
            // update status
            await transactionModel.findByIdAndUpdate({
                _id: transaction_code
            }, {
                status: 'completed'
            });
            // send mail
            await sendMail({
                userMail: user.email,
                subject: 'Xác nhận thanh toán',
                text: 'Bạn đã thanh toán thành công',
                html: confirmCreator({
                    creator_name: user.name,
                })
            })
            return `http://localhost:5173/become-creator`
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    static returnRegisterCreatorFail = async (transaction_code) => {
        // update status
        await transactionModel.findByIdAndUpdate({
            _id: transaction_code
        }, {
            status: 'failed'
        });
        return `http://localhost:5173/home`
    }
}

module.exports = PaymentService;