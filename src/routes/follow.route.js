const express = require("express");
const followController = require("../controllers/follow.controller");
const router = express.Router();
const { checkIsLogin } = require('../auth');

// router.use(checkIsLogin)

router.get("/", followController.getFollowList);

router.post('/:authorId', followController.createNewFollow);

router.delete('/:authorId', followController.deleteFollow);

module.exports = router;
