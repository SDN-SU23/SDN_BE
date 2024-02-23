const express = require("express");
const userController = require("../controllers/user.controller");
const notificationController = require("../controllers/notification.controller");

const router = express.Router();

router.get("/", notificationController.getAllNotifications);

router.post("/", notificationController.createNotification);

router.get("/:id", notificationController.getNotificationByID);

router.put("/:id", notificationController.updateNotification);

router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
