const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", userController.getListUser);
router.post("/", userController.createUser);
router.get('/:userId', userController.getUserById)
router.get('profile/:userId', userController.getProfileById)
router.put('/changePassword/:userId', userController.changePassword)
module.exports = router;
