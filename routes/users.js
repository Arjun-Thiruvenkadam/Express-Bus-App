const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUserWithId(userId);
  return res.send(user);
});

module.exports = router;
