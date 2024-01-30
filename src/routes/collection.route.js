const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collection.controller");

router.get("/", collectionController.getListCollection);
router.post("/", collectionController.createCollection);
router.get("/:collectId", collectionController.getCollectionDetails);
router.put("/:collectId", collectionController.updateCollection);
router.delete("/:collectId", collectionController.deleteCollection);

module.exports = router;
