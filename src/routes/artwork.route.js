const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artwork.controller");
const { uploadDisk } = require("../configs/multer.config");

router.get("/", artworkController.getListArtwork);
router.post("/", artworkController.createArtwork);
router.delete("/:artworkId", artworkController.deleteArtwork);
router.get("/:artworkId", artworkController.getArtworkDetail);
router.put("/:artworkId", artworkController.updateArtwork);
router.put("/updateByAdmin/:artworkId", artworkController.updateArtworkByAdmin);
router.get("/getArtWorkByAdmin", artworkController.getArtWorkByAdmin);

module.exports = router;
