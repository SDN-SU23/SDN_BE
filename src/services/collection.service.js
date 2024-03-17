"use strict";

const collectionModel = require("../models/collection.model");
const { getListInfo } = require("../utils");
const { createSignedUrlDetail } = require('../services/upload.service')

class CollectionService {
  static getListCollection = async () => {
    try {
      const result = await collectionModel.find({});
      return result;
    } catch (error) {
      global.logger.error("Service:: getListCollection", error);
      throw error;
    }
  };

  static getListCollectionByUserId = async (userId) => {
    try {
      let result = await collectionModel.find({ authorId: userId }).populate("imageId").populate("authorId").lean();

      for (let i = 0; i < result.length; i++) {
        result[i].imageURL = await createSignedUrlDetail(result[i].imageId.imageURL)
      }

      return result
    } catch (error) {
      global.logger.error("Service:: getListCollectionByUserId", error);
      throw error;
    }
  };
}

module.exports = CollectionService;
