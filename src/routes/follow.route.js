const express = require("express");
const followController = require("../controllers/follow.controller");
const router = express.Router();

router.get("/", followController.getFollowList);
router.put("/:followId", followController.updateFollowListById);

module.exports = router;
