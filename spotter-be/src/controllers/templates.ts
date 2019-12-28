import Template from "../models/Template";
import asyncHandler from "../middleware/async";
import Err from "../utils/Err";
import * as hex from "is-hexcolor";
import { ITemplate, ITag } from "src/types/models";

// @desc --> get all templates by user id
// @route --> GET /api/auth/templates
// @access --> Private

export const getTemplatesByUserId = asyncHandler(async (req, res) => {
  const templates: Array<ITemplate> = await Template.find({
    user: req.user!._id
  });

  return res
    .status(200)
    .json({ success: true, count: templates.length, templates });
});

// @desc --> add template
// @route --> POST /api/auth/template
// @access --> Private

export const addTemplate = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const templates: Array<ITemplate> = await Template.find({
    name: req.body.name,
    user: req.body.user
  });

  if (templates.length) {
    return next(new Err("Template already exists", 400));
  }

  let colorValidate: Array<ITag | false> = [];

  // map over the tags in the template and error out if invalid color detected
  if (req.body.tags && req.body.tags.length) {
    colorValidate = req.body.tags.map((el: ITag) => hex(el.color));
  }

  if (colorValidate.includes(false)) {
    return next(new Err("Invalid color detected", 400));
  }

  const template: ITemplate = await Template.create(req.body);

  res.status(201).json({
    success: true,
    data: template
  });
});

// @desc --> edit template
// @route --> PUT /api/auth/templates/:id
// @access --> Private

export const editTemplate = asyncHandler(async (req, res) => {
  let template: ITemplate | null = await Template.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: template
  });
});

// @desc --> delete template
// @route --> DELETE /api/auth/template/:id
// @access --> Private

export const deleteTemplate = asyncHandler(async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: "Template deleted"
  });
});
