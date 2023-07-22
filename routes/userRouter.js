const Router = require("express");

const userController = require("../controllers/userController");

const router = new Router();

const authMiddleware = require('../middleware/authMiddleware')

router.post("/register",userController.register);

router.post("/login", userController.login);

router.get("/auth", authMiddleware, userController.check);

router.get("/info", authMiddleware, userController.getUserInfo);

module.exports = router;
