"use strict";

const followModel = require("../models/follow.model");

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
