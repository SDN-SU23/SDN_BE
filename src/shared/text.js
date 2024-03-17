const time = require('../helpers/timestamp.helper');

module.exports = {
    text_os: {
        "orderCode": 123456,
        "amount": 5000,
        "description": "VQRIO1234",
        "buyerName": "Nguyen Van A",
        "buyerEmail": "buyer-email@gmail.com",
        "buyerPhone": "090xxxxxxx",
        "buyerAddress": "số nhà, đường, phường, tỉnh hoặc thành phố",
        "items": [],
        "cancelUrl": "https://your-cancel-url.com",
        "returnUrl": "https://your-success-url.com",
        "expiredAt": time.addOneDayUnix(),
        "signature": "string"
    }
}