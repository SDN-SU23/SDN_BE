"use strict";

const { isValidObjectId } = require("mongoose");
const ArtworkService = require("../services/artwork.service");

class ArtworkController {
  test = async (req, res) => {
    res.json({
      title: "test",
    });
  };

  getListArtwork = async (req, res) => {
    try {
      console.log("controller");
      return res.status(200).json({
        status: 200,
        data: await ArtworkService.getListArtwork(),
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  getArtworkDetail = async (req, res) => {
    try {
      const artworkId = req.params.artworkId;

      const result = await ArtworkService.getArtworkDetail(artworkId);

      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Artwork not found",
        });
      }

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

  createArtwork = async (req, res) => {
    try {
      const data = await ArtworkService.createArtwork(req.body);

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

  updateArtwork = async (req, res) => {
    try {
      const artworkId = req.params.artworkId;
      const data = req.body;

      const updatedData = await ArtworkService.updateArtwork(artworkId, data);

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

  deleteArtwork = async (req, res) => {
    try {
      const artworkId = req.params.artworkId;

      const result = await ArtworkService.deleteArtwork(artworkId);

      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Artwork not found",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Artwork deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
}

module.exports = new ArtworkController();