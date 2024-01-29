"use strict";

const collectionModel = require("../models/collection.model");
const { getListInfo } = require("../utils");

class CollectionService {
  static getListCollection = async () => {
    try {
      const result = await collectionModel.find({});
      return getListInfo({
        // field: ["name", "email"],
        object: result,
      });
    } catch (error) {
      global.logger.error("Service:: getListCollection", error);
      throw error;
    }
  };

  static createCollection = async (data) => {
    try {
      const result = await collectionModel.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  };
  static updateCollection = async (collectId, newData) => {
    try {
      const result = await collectionModel.findByIdAndUpdate(
        collectId,
        { $set: newData },
        { new: true }
      );

      if (!result) {
        throw new Error("Collection not found");
      }

      return result;
    } catch (error) {
      global.logger.error("Service:: updateCollection", error);
      throw error;
    }
  };
  static deleteCollection = async (collectionId) => {
    try {
      const result = await collectionModel.findByIdAndDelete(collectionId);
      return result;
    } catch (error) {
      global.logger.error("Service:: deleteCollection", error);
      throw error;
    }
  };
}

module.exports = CollectionService;
