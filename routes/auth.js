const express = require("express");
const router = express.Router();
const authController = require("../services/authService");

router.post("/", authController.auth);

module.exports = router;
