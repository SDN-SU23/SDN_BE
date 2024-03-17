const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { checkIsLogin } = require('../auth');

// router.use(checkIsLogin)

router.get("/createPaymentURL/:accountId/:artworkId", paymentController.createPaymentUrlPayArtWork);

router.get("/returnURL/:transaction_code", paymentController.returnPayArtWorkSuccess);

router.get("/returnURLFail/payArtWork/:transaction_code", paymentController.returnPayArtWorkFail);

router.get("/createPaymentUrlRegisterCreator/:accountId", paymentController.createPaymentUrlRegisterCreator);

router.get("/returnURL/registerCreator/:transaction_code", paymentController.returnRegisterCreatorSuccess);

router.get("/returnURLFail/registerCreator/:transaction_code", paymentController.returnRegisterCreatorFail);

module.exports = router;

