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

  createNewFollow = async (req, res) => {
    try {
      const result = await FollowService.createNewFollow(req.params.authorId, req.body.userId);

      return res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  deleteFollow = async (req, res) => {
    try {
      const result = await FollowService.deleteFollow(req.params.authorId, req.query.userId);

      return res.status(200).json({
        status: 200,
        data: result,
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
