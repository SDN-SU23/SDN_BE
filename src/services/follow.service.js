"use strict";

const followModel = require("../models/follow.model");
const notificationService = require("./notification.service");
const userModel = require("../models/user.model");

class FollowService {
  static getFollowList = async () => {
    try {
      const result = await followModel.find({});
      return getListInfo({
        // field: ["name", "email"],
        object: result,
      });
    } catch (error) {
      global.logger.error("Service:: getFollowList", error);
      throw error;
    }
  };

  static createNewFollow = async (authorId, userId) => {
    try {
      const result = await followModel.create(
        {
          userId: authorId,
          followBy: userId,
        }
      );
      // get detail of author
      const user = await userModel.findById(userId);
      // send notification to author of artwork
      await notificationService.createNotification({
        user_id: authorId,
        message: `You have a new follower ${user.name}`,
      })

      return result;
    } catch (error) {
      global.logger.error("Service:: createNewFollow", error);
      throw error;
    }
  };

  static deleteFollow = async (authorId, userId) => {
    try {
      const result = await followModel.findOneAndDelete({
        userId: authorId,
        followBy: userId,
      });
      return result;
    } catch (error) {
      global.logger.error("Service:: deleteFollow", error);
      throw error;
    }
  };

}
module.exports = FollowService;
