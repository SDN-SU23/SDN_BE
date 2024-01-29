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
  createCollection = async (req, res) => {
    try {
      const data = await CollectionService.createCollection(req.body);

      return res.status(200).json({
        status: 200,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
  updateCollection = async (req, res) => {
    try {
      const collectId = req.params.collectId;
      const dataToUpdate = req.body;

      const updatedData = await CollectionService.updateCollection(
        collectId,
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
  deleteCollection = async (req, res) => {
    try {
      const collectionId = req.params.collectionId;

      if (!isValidObjectId(collectionId)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid collectionId format",
        });
      }
      const result = await CollectionService.deleteCollection(collectionId);

      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Collection not found",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Collection deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
  getCollectionDetails = async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const collectionDetails =
        await CollectionService.getCollectionDetailsById(collectionId);

      return res.status(200).json({
        status: 200,
        data: collectionDetails,
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
