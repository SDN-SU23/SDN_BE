"use strict";

const notificationModel = require("../models/notification.model");
const userModel = require("../models/user.model");
const supabase = require('../configs/supabase.config');

class NotificationService {
  static getNotificationByuser = async (userId) => {
    try {
      const { data: userNotifications, error: userError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId);

      if (userError) throw userError;

      const { data: allNotifications, error: allError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', 'all');

      if (allError)
        throw allError;

      // Merge results if both queries were successful
      return userNotifications.concat(allNotifications);
    } catch (error) {
      global.logger.error("Service:: getNotificationByuser", error);
      throw error;
    }
  };

  static createNotification = async ({ user_id, message }) => {
    try {
      const { data: notification, error } = await supabase
        .from('Notification')
        .insert({
          user_id: user_id,
          message: message,
          is_read: false,
        })
      return notification;
    } catch (error) {
      global.logger.error("Service:: createNotification", error);
      throw error;
    }
  }
}

module.exports = NotificationService;
