const express = require("express");
const notificationController = require("../controllers/notification.controller");
const { checkIsLogin } = require('../auth');

const router = express.Router();

// router.use(checkIsLogin)

router.get('/:userId', notificationController.getNotificationByuser)



module.exports = router;
