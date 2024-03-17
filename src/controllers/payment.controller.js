'use strict'

const paymentService = require('../services/payment.service');

class PaymentController {
    createPaymentUrlPayArtWork = async (req, res) => {
        try {
            const { accountId, artworkId } = req.params;
            const url = await paymentService.createNewOrder(accountId, artworkId);
            res.redirect(url.checkoutUrl)
            // res.redirect(vnpUrl)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    returnPayArtWorkSuccess = async (req, res) => {
        try {
            console.log(`abc`)
            const url = await paymentService.returnPayArtWorkSuccess(req.params.transaction_code)
            res.redirect(url)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    returnPayArtWorkFail = async (req, res) => {
        try {
            const url = await paymentService.returnPayArtWorkFail(req.params.transaction_code)
            res.redirect(url)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    createPaymentUrlRegisterCreator = async (req, res) => {
        try {
            const { accountId } = req.params;
            const url = await paymentService.createPaymentUrlRegisterCreator(accountId);
            res.redirect(url.checkoutUrl)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    returnRegisterCreatorSuccess = async (req, res) => {
        try {
            const url = await paymentService.returnRegisterCreatorSuccess(req.params.transaction_code)
            res.redirect(url)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    returnRegisterCreatorFail = async (req, res) => {
        try {
            const url = await paymentService.returnRegisterCreatorFail(req.params.transaction_code)
            res.redirect(url)
        } catch (error) {
            res.status(500).send(error)
        }
    }


}

module.exports = new PaymentController()
