const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth");

const AuthController = require("../app/controller/AuthController");

router.get("/", verifyToken, AuthController.index);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
