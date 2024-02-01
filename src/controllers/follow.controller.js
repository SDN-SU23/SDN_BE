"use strict";

const FollowService = require("../services/follow.service");

class FollowController {
  getFollowList = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        data: await FollowService.getFollowList(),
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
  updateFollowListById = async (req, res) => {
    try {
      const followId = req.params.followId;
      const dataToUpdate = req.body;

      const updatedData = await FollowService.updateFollowList(
        followId,
        dataToUpdate
      );

      return res.status(200).json({
        status: 200,
        data: updatedData,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
}
module.exports = new FollowController();
