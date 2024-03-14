const express = require("express");
const userController = require("../controllers/user.controller");
const notificationController = require("../controllers/notification.controller");
const { checkIsLogin } = require('../auth');

const router = express.Router();

router.use(checkIsLogin)

router.get("/:id", notificationController.getNotificationByID);

router.get("/getNotificationByUserId/:userId", notificationController.getAllNotifications);

// can't post system auto generate
router.post("/createNotificationToUser", notificationController.createNotificationToUser);

router.post("/createNotificationToAllUser", notificationController.createNotificationToAllUser);



module.exports = router;
