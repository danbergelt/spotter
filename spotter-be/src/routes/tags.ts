const express = require("express");
const {
  createTag,
  deleteTag,
  editTag,
  getTags
} = require("../controllers/tags");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Routes
router
  .route("/")
  .post(protect, createTag)
  .get(protect, getTags);

router
  .route("/:id")
  .delete(protect, deleteTag)
  .put(protect, editTag);

export default router;
