const express = require("express");
const router = express.Router();
const authController = require("../services/authService");

router.post("/", async (req, res) => {
  const authPayload = req.body;
  const result = await authController.auth(authPayload);
  return res.send(result);
});

module.exports = router;
