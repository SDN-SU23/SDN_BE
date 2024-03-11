"use strict";

const CollectionService = require("../services/collection.service");

class CollectionController {
  getListCollection = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        data: await CollectionService.getListCollection(),
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  getListCollectionByUserId = async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
        data: await CollectionService.getListCollectionByUserId(req.params.userId),
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

}

module.exports = new CollectionController();
