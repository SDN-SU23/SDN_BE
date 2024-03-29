'use strict'

const userModel = require("../models/user.model");
const { getListInfo } = require("../utils");
const followModel = require('../models/follow.model');
const artworkModel = require('../models/artwork.model');
const bcrypt = require('bcrypt');
const uploadService = require('./upload.service');

class UserService {
  static getListUser = async (query) => {
    try {
      let { searchName, searchRole, currentPage, pageSize } = query

      let filter = {}

      if (searchName) {
        filter.name = { $regex: searchName, $options: 'i' }
      } else {
        filter.name = { $regex: '', $options: 'i' }
      }

      if (searchRole) {
        searchRole = searchRole.split(',')
        filter.role = { $in: searchRole }
      }

      const result = await userModel.find(filter).limit(pageSize).skip((currentPage - 1) * pageSize).lean();

      const totalPage = Math.ceil(await userModel.countDocuments(filter) / pageSize);

      return {
        result,
        totalPage: totalPage,
        currentPage: currentPage,
        pageSize: pageSize,
      }
    } catch (error) {
      global.logger.error('Service:: getListUser', error)
      throw error
    }
  }

  static createUser = async (data) => {
    try {
      const result = await userModel.create(data)
      return result
    } catch (error) {
      throw error
    }
  }

  static getUserById = async (userId) => {
    try {

      // get list artWork
      const artWorkList = await artworkModel.find({
        authorId: userId
      }).lean();

      for (let i = 0; i < artWorkList.length; i++) {
        const signURL = await uploadService.createSignedUrlDetailForUser(artWorkList[i].imageURL);
        artWorkList[i].imageURL = signURL;
      }

      const user = await userModel.findById(userId);
      // get list follow list
      const followList = await followModel.find({
        userId: userId
      }).lean();
      // get list follow by
      const followByList = await followModel.find({
        followBy: userId
      }).lean();

      return {
        userId: user._id,
        avatar: user.avatarUrl,
        name: user.name,
        artWorkList,
        followList,
        followByList,
      }
    } catch (error) {
      throw error
    }
  }

  static getProfileById = async (userId) => {
    try {
      const user = await userModel.findById(userId)
      return user
    } catch (error) {
      throw error
    }
  }

  static changePassword = async (userId, password, oldPassword) => {
    try {
      const user = await userModel.findById(userId)
      // check password
      const isMatch = await bcrypt.compare(oldPassword, user.password)
      if (!isMatch) {
        throw new Error('old Password is not match')
      }
      // hash password
      const newPass = await bcrypt.hash(password, 10)
      // update password
      const result = await userModel.findByIdAndUpdate(userId, {
        password: newPass,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static updateUser = async (userId, data) => {
    try {
      const result = await userModel.findByIdAndUpdate(userId, {
        ...data,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static deleteUser = async (userId) => {
    try {
      const result = await userModel.findByIdAndUpdate(userId, {
        status: false,
      })
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService
