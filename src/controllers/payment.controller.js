'use strict'

const PaymentService = require('../services/payment.service');

class PaymentController {
    createPaymentUrl = async (req, res) => {
        try {
            // Your code here
            res
                .status(200)
                .json({
                    message: "createPaymentUrl controller called",
                    data: await PaymentService.createPaymentUrl(req.query),
                });
        } catch (error) {
            res
                .status(500)
                .send(error);
        }
    }
}

module.exports = new PaymentController();