const express = require('express');
const authController = require('../services/authService');

const router = express.Router();
router.post('/signup', async (req, res) => {
  const authPayload = req.body;
  const result = await authController.signUp(authPayload);
  return res.send(result);
});

router.post('/login', async (req, res) => {
  const loginPayload = req.body;
  const result = await authController.login(loginPayload);
  return res.send(result);
});

module.exports = router;
