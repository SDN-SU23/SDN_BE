"use strict";

const notificationModel = require("../models/notification.model");

class NotificationService {
  static getAllNotifications = async () => {
    try {
      const result = await notificationModel.find();
      return result;
    } catch (error) {
      global.logger.error("Service:: getListNotification", error);
      throw error;
    }
  };

  static createNotification = async (data) => {
    try {
      const result = await notificationModel.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  static getNotificationByID = async (id) => {
    try {
      const result = await notificationModel.findById(id);
      return result;
    } catch (error) {
      global.logger.error("Service:: getListNotification", error);
      throw error;
    }
  };

  static updateNotification = async (id, newData) => {
    try {
      const result = await notificationModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static deleteNotification = async (id) => {
    try {
      const result = await notificationModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = NotificationService;
