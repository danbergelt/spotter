const Template = require("../models/Template");
const asyncHandler = require("../middleware/async");
const Err = require("../utils/Err");

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

  const template = await Template.create(req.body);

  res.status(201).json({
    success: true,
    data: template
  });
});
