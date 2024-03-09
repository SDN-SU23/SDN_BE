const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artwork.controller");
const { uploadDisk } = require("../configs/multer.config");

router.get("/", artworkController.getListArtwork);
router.post("/", artworkController.createArtwork);
router.delete("/:artworkId", artworkController.deleteArtwork);
router.get("/:artworkId", artworkController.getArtworkDetail);

module.exports = router;
