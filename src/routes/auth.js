const express = require("express");
const router = express.Router();
const authController = require("../services/auth");

router.post("/", authController.auth);

module.exports = router;
