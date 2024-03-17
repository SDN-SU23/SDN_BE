'use strict'

const paymentService = require('../services/payment.service');

class PaymentController {
    createPaymentUrlPayArtWork = async (req, res) => {
        try {
            const { accountId, artworkId } = req.params
            res.status(200).json({
                metadata: await paymentService.createNewOrder(accountId, artworkId)
            })
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

    // sortObject = (obj) => {
    //     let sorted = {}
    //     let str = []
    //     let key
    //     for (key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             str.push(encodeURIComponent(key))
    //         }
    //     }
    //     str.sort()
    //     for (key = 0; key < str.length; key++) {
    //         sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
    //             /%20/g,
    //             '+'
    //         )
    //     }
    //     return sorted
    // }

    // createPaymentUrlRegisterCreator = async (req, res) => {
    //     try {
    //         const { accountId } = req.params
    //         let ipAddr =
    //             req.headers['x-forwarded-for'] || req.connection.remoteAddress

    //         var tmnCode = global.config.payment.vnp_TmnCode
    //         var secretKey = global.config.payment.vnp_HashSecret
    //         var vnpUrl = global.config.payment.vnp_Url
    //         var returnUrl = global.config.payment.vnp_ReturnUrl
    //         var date = new Date()
    //         var orderId = moment(date).format('HHmmss')
    //         var orderType = 'sales'
    //         var locale = 'vn'
    //         var currCode = 'VND'
    //         if (!accountId) {
    //             throw new Error('accountId is required')
    //         }
    //         var newDate = new Date()
    //         newDate.setDate(newDate.getDate() + 1)
    //         var newCreateDate = moment(newDate).format('YYYYMMDDHHmmss')
    //         var vnp_Params = {
    //             vnp_Version: '2.1.0',
    //             vnp_Command: 'pay',
    //             vnp_TmnCode: tmnCode,
    //             vnp_Locale: locale,
    //             vnp_CurrCode: currCode,
    //             vnp_TxnRef: orderId,
    //             vnp_OrderInfo: 'Thanh toan cho ma GD: ' + orderId,
    //             vnp_OrderType: orderType,
    //             vnp_Amount: 30000 * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VNĐ -> xu)
    //             vnp_ReturnUrl: `${returnUrl}RegisterCreator/${accountId}`,
    //             vnp_IpAddr: ipAddr,
    //             vnp_CreateDate: newCreateDate,
    //         }
    //         vnp_Params = this.sortObject(vnp_Params)
    //         console.log(vnp_Params)
    //         let signData = querystring.stringify(vnp_Params, { encode: false })
    //         let hmac = crypto.createHmac('sha512', secretKey)
    //         let signed = hmac
    //             .update(new Buffer(signData, 'utf-8'))
    //             .digest('hex')
    //         vnp_Params['vnp_SecureHash'] = signed
    //         vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })
    //         res.redirect(vnpUrl)
    //     } catch (error) {
    //         res.status(500).send(error)
    //     }
    // }

    // vnPayReturnRegisterCreator = async (req, res) => {
    //     try {
    //         // const { accountId } = req.params
    //         // // create transactiom
    //         // await transactiomModel.create({
    //         //     type: 'registerCreator',
    //         //     content: 'Thanh toan dang ky tac gia',
    //         //     senderId: accountId,
    //         //     amount: 30000,
    //         //     status: 'completed',
    //         // })
    //         // // update account
    //         // await userModel.findByIdAndUpdate(accountId, { role: 'Creator' })
    //         // // create notificate to receiver
    //         // await notificationModel.create({
    //         //     message: 'Bạn đã thanh toán 30000 để đăng ký tác giả',
    //         //     userId: accountId,
    //         // })
    //         // console.log('done')

    //         res.redirect('http://localhost:5173/done')
    //     } catch (error) {
    //         res.status(500).send(error)
    //     }
    // }
}

module.exports = new PaymentController()
