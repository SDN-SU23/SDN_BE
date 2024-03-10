const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.get("/create_payment_url", paymentController.createPaymentUrl);
// router.get("/create_payment_url_upgrade", paymentController.createPaymentUrlUpgrade);
// router.get("/return_Url", paymentController.vnPayReturn);

// router.get("/return_Url_upgrade", paymentController.vnPayReturnUpgrade);

module.exports = router;

