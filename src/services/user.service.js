"use strict";

const userModel = require("../models/user.model");
const { getListInfo } = require("../utils");
const followModel = require('../models/follow.model');
const artworkModel = require('../models/artwork.model');
const bcrypt = require('bcrypt');

class UserService {

  static getListUser = async (query) => {
    try {
      let { searchName, searchRole, curentPage, pageSize } = query;

      let filter = {};

      if (searchName) {
        filter.name = { $regex: searchName, $options: "i" };
      } else {
        filter.name = { $regex: "", $options: "i" };
      }

      if (searchRole) {
        searchRole = searchRole.split(',')
        filter.role = { $in: searchRole }
      }

      const result = await userModel.find(filter).limit(pageSize).skip((curentPage - 1) * pageSize);

      return result;
    } catch (error) {
      global.logger.error("Service:: getListUser", error);
      throw error;
    }
  };

  static createUser = async (data) => {
    try {
      const result = await userModel.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  static getUserById = async (userId) => {
    try {
      const user = await userModel.findById(userId);
      // get list follow list
      const followList = await followModel.find({
        userId: userId
      });
      // get list follow by
      const followByList = await followModel.find({
        followBy: userId
      });
      // get list artWork
      const artWorkList = await artworkModel.find({
        authorId: userId
      });

      artWorkList.map(artWork => {
        return {
          imageURL: artWork.imageURL,
        }
      });

      return {
        avatar: user.avatarUrl,
        name: user.name,
        artWorkList,
        followList,
        followByList
      };
    }

    catch (error) {
      throw error;
    }
  }

  static getProfileById = async (userId) => {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static changePassword = async (userId, password) => {
    try {
      const user = await userModel.findById(userId);
      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Password is not match');
      }
      // hash password
      const newPass = await bcrypt.hash(password, 8);
      // update password
      const result = await userModel.findByIdAndUpdate
        (
          userId,
          {
            password: newPass
          }
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static updateUser = async (userId, data) => {
    try {
      const result = await userModel.findByIdAndUpdate
        (
          userId,
          {
            ...data
          }
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static deleteUser = async (userId) => {
    try {
      const result = await userModel.findByIdAndUpdate(userId, { status: false })
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UserService;
