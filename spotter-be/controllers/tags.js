const Err = require("../utils/Err");
const Tag = require("../models/Tag");
const asyncHandler = require("../middleware/async");

// @desc --> create tag
// @route --> POST /api/auth/tags
// @access --> Private

exports.createTag = asyncHandler(async (req, res, next) => {
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

  if (tags.length >= 25) {
    return next(new Err("25 tag maximum", 400));
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
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new Err("Could not delete tag", 400));
  }

  await tag.remove();

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
