'use strict'

const querystring = require('qs');
const crypto = require('node:crypto');
const moment = require('moment');

const PaymentService = require('../services/payment.service');

class PaymentController {
    createPaymentUrl = async (req, res) => {
        try {
            const { accountId, amount, type } = req.query;
            let ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

            var tmnCode = global.config.payment.vnp_TmnCode;
            var secretKey = global.config.payment.vnp_HashSecret;
            var vnpUrl = global.config.payment.vnp_Url;
            var returnUrl = global.config.payment.vnp_ReturnUrl;
            console.log(tmnCode, secretKey, vnpUrl, returnUrl)
            var date = new Date();
            var orderId = moment(date).format("HHmmss");
            var orderType = "sales";
            var locale = "vn";
            var currCode = "VND";
            if (!accountId) {
                throw new Error("accountId is required");
            }
            var newDate = new Date();
            newDate.setDate(newDate.getDate() + 1);
            var newCreateDate = moment(newDate).format("YYYYMMDDHHmmss");
            var vnp_Params = {
                vnp_Version: "2.1.0",
                vnp_Command: "pay",
                vnp_TmnCode: tmnCode,
                vnp_Locale: locale,
                vnp_CurrCode: currCode,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: "Thanh toan cho ma GD: " + orderId,
                vnp_OrderType: orderType,
                vnp_Amount: 100000 * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VNĐ -> xu)
                vnp_ReturnUrl: `${returnUrl}`,
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: newCreateDate
            };
            vnp_Params = this.sortObject(vnp_Params);
            console.log(vnp_Params)
            let signData = querystring.stringify(vnp_Params, { encode: false });
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
            res.redirect(vnpUrl);

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

    sortObject = (obj) => {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
}

module.exports = new PaymentController();