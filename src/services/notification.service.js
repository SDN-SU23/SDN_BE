"use strict";

const notificationModel = require("../models/notification.model");
const userModel = require("../models/user.model");

class NotificationService {
  static getAllNotifications = async (userId) => {
    try {
      const result = await notificationModel.find(
        { userId: userId }
      );
      return result;
    } catch (error) {
      global.logger.error("Service:: getListNotification", error);
      throw error;
    }
  };

  static createNotificationToUser = async (data) => {
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

  static createNotificationToAllUser = async (data) => {
    try {
      // role audience hoặc creator
      const listUser = await userModel.find({
        role: { $in: ["audience", "creator"] },
      });

      for (const user of listUser) {
        const item = {
          ...data,
          userId: user._id,
        };
        await notificationModel.create(item);
      }

      return "Create notification success";
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = NotificationService;
