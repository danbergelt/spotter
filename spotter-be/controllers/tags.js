const Err = require("../utils/Err");
const Tag = require("../models/Tag");
const asyncHandler = require("../middleware/async");
const hex = require("is-hexcolor");

// @desc --> create tag
// @route --> POST /api/auth/tags
// @access --> Private

exports.createTag = asyncHandler(async (req, res, next) => {
  // checks for matches on tags with no content
  if (req.body.color && !req.body.content) {
    const tags = await Tag.find({
      user: req.user._id,
      color: req.body.color,
      content: ""
    });
    if (tags.length) {
      return next(new Err("Tag already exists", 400));
    }
  }

  // checks for matches on tags with content
  if (req.body.color && req.body.content) {
    const tags = await Tag.find({
      user: req.user._id,
      color: req.body.color,
      content: req.body.content
    });
    if (tags.length) {
      return next(new Err("Tag already exists", 400));
    }
  }

  const tags = await Tag.find({ user: req.user._id });

  // Enforces a 25 tag maximum
  if (tags.length >= 25) {
    return next(new Err("25 tag maximum", 400));
  }

  // validates hex code for color, so corrupt code is not rendered on FE
  if (!hex(req.body.color)) {
    return next(new Err("Invalid color detected", 400));
  }

  req.body.user = req.user._id;

  const tag = await Tag.create(req.body);

  res.status(201).json({
    success: true,
    tag
  });
});

// @desc --> delete tag
// @route --> DELETE /api/auth/tags/:id
// @access --> Private

exports.deleteTag = asyncHandler(async (req, res, next) => {
  await Tag.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: "Tag deleted"
  });
});

// @desc --> edit tag
// @route --> PUT /api/auth/tags/:id
// @access --> Private

exports.editTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    tag
  });
});

// @desc --> get all tags by user id
// @route --> GET /api/auth/tags
// @access --> Private

exports.getTags = asyncHandler(async (req, res, next) => {
  let tags = await Tag.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    count: tags.length,
    tags
  });
});
