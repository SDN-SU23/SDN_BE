// "use strict";

const NotificationService = require("../services/notification.service");

class NotificationController {
  getNotificationByuser = async (req, res) => {
    try {
      const notification = await NotificationService.s(req.params.userId);
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

module.exports = new NotificationController();
