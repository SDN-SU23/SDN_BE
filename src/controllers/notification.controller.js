"use strict";

const NotificationService = require("../services/notification.service");

class NotificationController {
  getAllNotifications = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        data: await NotificationService.getAllNotifications(req.params.userId),
      });
    } catch (error) {
      console.error("Error retrieving notifications:", error);
    }
  };

  createNotificationToUser = async (req, res) => {
    try {
      const data = await NotificationService.createNotificationToUser(req.body);
      return res.status(200).json({
        status: 200,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  getNotificationByID = async (req, res) => {
    const { id } = req.params;

    try {
      const notification = await NotificationService.getNotificationByID(id);

      if (!notification) {
        return res.status(404).json({
          status: 404,
          message: "Notification not found",
        });
      }

      return res.status(200).json({
        status: 200,
        data: notification,
      });
    } catch (error) {
      console.error("Error retrieving notification by ID:", error);
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  createNotificationToAllUser = async (req, res) => {
    try {
      return res
        .status(200)
        .json({
          status: 200,
          data: await NotificationService.createNotificationToAllUser(req.body),
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

}

module.exports = new NotificationController();
