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
                    data: await PaymentService.createVnPayUrl(req.params.accountId, req.params.amount, req.params.type, req),
                });
        } catch (error) {
            res
                .status(500)
                .send(error);
        }
    }

    vnPayReturn = async (req, res) => {
        try {
            const data = await await PaymentService.vnPayReturn(req.params.accountId, req.params.amount, req.params.type, req.query);
            res.redirect(`localhost:3000`)

        } catch (error) {
            res
                .status(500)
                .send(error);
        }
    }
}

module.exports = new PaymentController();