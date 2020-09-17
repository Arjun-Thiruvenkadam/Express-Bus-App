const express = require('express');
const userService = require('../services/userService');

const router = express.Router();
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserWithId(userId);
  return res.send(user);
});

module.exports = router;
