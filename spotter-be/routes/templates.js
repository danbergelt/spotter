const express = require("express");
const {
  getTemplatesByUserId,
  addTemplate,
  editTemplate
} = require("../controllers/templates");

const router = express.Router();

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getTemplatesByUserId)
  .post(protect, addTemplate);

router.route("/:id").put(protect, editTemplate);

module.exports = router;
