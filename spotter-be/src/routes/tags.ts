import express from "express";
import {
  createTag,
  deleteTag,
  editTag,
  getTags
} from "../controllers/tags";
const router = express.Router();
import { protect } from "../middleware/auth";

// Routes
router
  .route("/")
  //@ts-ignore
  .post(protect, createTag)
  .get(protect, getTags);

router
  .route("/:id")
  //@ts-ignore
  .delete(protect, deleteTag)
  .put(protect, editTag);

export default router;
