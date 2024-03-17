const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { checkIsLogin } = require('../auth');

// router.use(checkIsLogin)

router.get("/createPaymentURL/:accountId/:artworkId", paymentController.createPaymentUrlPayArtWork);

router.get("/returnURL/:transaction_code", paymentController.returnPayArtWorkSuccess);

router.get("/returnURLFail/:transaction_code", paymentController.returnPayArtWorkFail);

// router.get("/returnRegisterCreator/:accountId", paymentController.vnPayReturnRegisterCreator);

// router.get("/createPaymentUrlRegisterCreator/:accountId", paymentController.createPaymentUrlRegisterCreator);


module.exports = router;

