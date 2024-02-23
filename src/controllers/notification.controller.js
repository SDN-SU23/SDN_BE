"use strict";

const NotificationService = require("../services/notification.service");

class NotificationController {
  getAllNotifications = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        data: await NotificationService.getAllNotifications(),
      });
    } catch (error) {
      console.error("Error retrieving notifications:", error);
    }
  };

  createNotification = async (req, res) => {
    try {
      const data = await NotificationService.createNotification(req.body);
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

  updateNotification = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedNotification = await NotificationService.updateNotification(
        id,
        newData
      );

      if (!updatedNotification) {
        return res.status(404).json({
          status: 404,
          message: "Notification not found",
        });
      }

      return res.status(200).json({
        status: 200,
        data: updatedNotification,
      });
    } catch (error) {
      console.error("Error updating notification:", error);
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedNotification = await NotificationService.deleteNotification(
        id
      );

      if (!deletedNotification) {
        return res.status(404).json({
          status: 404,
          message: "Notification not found",
        });
      }

      return res.status(200).json({
        status: 200,
        data: deletedNotification,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
}

module.exports = new NotificationController();
