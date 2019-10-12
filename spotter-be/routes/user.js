const express = require('express');

// routes

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Testing express server" });
});

module.exports = router;