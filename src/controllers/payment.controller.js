'use strict'

const PaymentService = require('../services/payment.service');

class PaymentController {
    createPaymentUrl = async (req, res) => {
        try {
            console.log("createPaymentUrl controller called");
            res
                .status(200)
                .json({
                    message: "createPaymentUrl controller called",
                    data: await PaymentService.createVnPayUrl(req.query.accountId, req.query.amount, req.query.orderInfo, req),
                });
        } catch (error) {
            res
                .status(500)
                .send(error);
        }
    }
}

module.exports = new PaymentController();