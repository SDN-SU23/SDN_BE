const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");


router.get("/returnPayArtWork/:accountId/:amount/:artworkId", paymentController.vnPayReturnPayArtWork);

router.get("/createPaymentUrlPayArtWork/:accountId/:amount/:artworkId", paymentController.createPaymentUrlPayArtWork);

router.get("/returnRegisterCreator/:accountId", paymentController.vnPayReturnRegisterCreator);

router.get("/createPaymentUrlRegisterCreator/:accountId", paymentController.createPaymentUrlRegisterCreator);


module.exports = router;

