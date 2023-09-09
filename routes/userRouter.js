const Router = require("express");
const checkRole = require('../middleware/checkRoleMiddleware')

const userController = require("../controllers/userController");

const router = new Router();

const authMiddleware = require('../middleware/authMiddleware')

router.post("/register",userController.register);

router.post("/login", userController.login);

router.get("/auth", authMiddleware, userController.check);

router.get("/info", authMiddleware, userController.getUserInfo);

router.get('/info/:id',checkRole('admin'), userController.getUserInfoById)

module.exports = router;
