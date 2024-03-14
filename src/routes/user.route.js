const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { checkIsLogin, checkRole } = require('../auth/index');

router.use(checkIsLogin)

router.get('/profile/:userId', userController.getProfileById)

router.put('/changePassword/:userId', userController.changePassword)

router.put('/profile/:userId', userController.updateUser)

router.get('/:userId', userController.getUserById)

router.use(checkRole('Admin'))

router.get("/", userController.getListUser);

router.post("/", userController.createUser);

router.delete('/:userId', userController.deleteUser)

module.exports = router;
