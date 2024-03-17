'use strict'
const payos = require('../configs/payos.config');
const transactionModel = require('../models/transaction.model');
const time = require('../helpers/timestamp.helper');
const collectionModel = require('../models/collection.model');
const notificationModel = require('../models/notification.model');
const { sendMail } = require('../configs/mail.config');
const { confirmPayment } = require('../utils/mail.util');
const artworkModel = require('../models/artwork.model');
const userModel = require('../models/user.model');

class PaymentService {
    static createNewOrder = async (accountId, artworkId) => {
        try {
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
                cancelUrl: 'http://localhost:3000/cancel',
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
}


module.exports = PaymentService;