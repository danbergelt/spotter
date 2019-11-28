const express = require("express");
const {
  getTemplatesByUserId,
  addTemplate
} = require("../controllers/templates");

const router = express.Router();

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getTemplatesByUserId)
  .post(protect, addTemplate);

module.exports = router;
