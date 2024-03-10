
const time = require('../helpers/timestamp.helper');
const querystring = ("qs");
const crypto = require('node:crypto');

class PaymentService {
    static createVnPayUrl = async (amount, accountId, type, req) => {
        try {
            let ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            var tmnCode = global.config.payment.vnp_TmnCode;
            var secretKey = global.config.payment.vnp_HashSecret;
            var vnpUrl = global.config.payment.vnp_Url;
            var returnUrl = global.config.payment.vnp_ReturnUrl;
            const date = new Date();
            var orderId = time.payGetTime(date);
            var orderType = "sales";
            var locale = "vn";
            var currCode = "VND";
            if (!accountId) {
                throw new Error("accountId is required");
            }
            var newDate = new Date();
            newDate.setDate(newDate.getDate() + 1);
            var newCreateDate = time.payGetNow(newDate);
            var vnp_Params = {
                vnp_Version: "2.1.0",
                vnp_Command: "pay",
                vnp_TmnCode: tmnCode,
                vnp_BankCode: "NCB",
                vnp_Locale: locale,
                vnp_CurrCode: currCode,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: "Payment for transaction code: " + orderId,
                vnp_OrderType: orderType,
                vnp_Amount: amount * 100,
                vnp_ReturnUrl: `${returnUrl}/${accountId}/${amount}/${type}`,
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: newCreateDate,
            };
            vnp_Params = this.sortObject(vnp_Params);
            let signData = JSON.stringify(vnp_Params, { encodeURI: false });
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl += "?" + JSON.stringify(vnp_Params, { encodeURI: false });
            return vnpUrl;
        } catch (error) {
            console.log("Error in createVnPayUrl", error);
            throw error;
        }
    }

    static sortObject(obj) {
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
module.exports = PaymentService;