const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collection.controller");
const { checkIsLogin } = require('../auth');

// router.use(checkIsLogin)

router.get("/", collectionController.getListCollection);

router.get("/getListCollectionByUserId/:userId", collectionController.getListCollectionByUserId);

module.exports = router;
