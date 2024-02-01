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
  static updateFollowList = async (followId, newData) => {
    try {
      const result = await followModel.findByIdAndUpdate(
        followId,
        { $set: newData },
        { new: true }
      );

      if (!result) {
        throw new Error("Follow not found");
      }

      return result;
    } catch (error) {
      global.logger.error("Service:: updateFollowList", error);
      throw error;
    }
  };
}
module.exports = FollowService;
