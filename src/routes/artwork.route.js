const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artwork.controller");

router.get("/", artworkController.getListArtwork);
router.post("/", artworkController.createArtwork);
router.put("/:artworkId", artworkController.updateArtwork);
router.delete("/:artworkId", artworkController.deleteArtwork);
router.get("/:artworkId", artworkController.getArtworkDetail);

module.exports = router;
