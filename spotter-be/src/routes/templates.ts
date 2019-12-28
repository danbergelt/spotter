import express from "express";
import {
  getTemplatesByUserId,
  addTemplate,
  editTemplate,
  deleteTemplate
} from "../controllers/templates";
const router = express.Router();
import { protect } from "../middleware/auth";

router
  .route("/")
  //@ts-ignore
  .get(protect, getTemplatesByUserId)
  .post(protect, addTemplate);

router
  .route("/:id")
  //@ts-ignore
  .put(protect, editTemplate)
  .delete(protect, deleteTemplate);

export default router;
