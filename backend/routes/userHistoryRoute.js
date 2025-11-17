const express = require("express");
const UserCreatedHistory = require("../models/userCreatedHistory");
const router = express.Router();

// GET all user creation logs
router.get("/", async (req, res) => {
  const logs = await UserCreatedHistory.find();
  res.json(logs);
});

module.exports = router;
