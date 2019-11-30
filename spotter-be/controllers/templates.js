const Template = require("../models/Template");
const asyncHandler = require("../middleware/async");
const Err = require("../utils/Err");
const hex = require("is-hexcolor");

// @desc --> get all templates by user id
// @route --> GET /api/auth/templates
// @access --> Private

exports.getTemplatesByUserId = asyncHandler(async (req, res, next) => {
  const templates = await Template.find({ user: req.user._id });

  return res
    .status(200)
    .json({ success: true, count: templates.length, templates });
});

// @desc --> add template
// @route --> POST /api/auth/template
// @access --> Private

exports.addTemplate = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const templates = await Template.find({
    name: req.body.name,
    user: req.body.user
  });

  if (templates.length) {
    return next(new Err("Template already exists", 400));
  }

  let colorValidate = [];

  if (req.body.tags && req.body.tags.length) {
    colorValidate = req.body.tags.map(el => hex(el.color));
  }

  if (colorValidate.includes(false)) {
    return next(new Err("Invalid color detected", 400));
  }

  const template = await Template.create(req.body);

  res.status(201).json({
    success: true,
    data: template
  });
});

// @desc --> edit template
// @route --> PUT /api/auth/templates/:id
// @access --> Private

exports.editTemplate = asyncHandler(async (req, res, next) => {
  let template = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: template
  });
});

// @desc --> delete template
// @route --> DELETE /api/auth/template/:id
// @access --> Private

exports.deleteTemplate = asyncHandler(async (req, res, next) => {
  let template = await Template.findById(req.params.id);

  await template.remove();

  res.status(200).json({
    success: true,
    data: "Template deleted"
  });
});
