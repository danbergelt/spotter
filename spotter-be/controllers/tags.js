const Err = require("../utils/Err");
const Tag = require("../models/Tag");
const asyncHandler = require("../middleware/async");

// @desc --> create tag
// @route --> POST /api/auth/tags
// @access --> Private

// @desc --> delete tag
// @route --> DELETE /api/auth/tags/:id
// @access --> Private

// @desc --> edit tag
// @route --> PUT /api/auth/tags/:id
// @access --> Private

// @desc --> get all tags by user id
// @route --> GET /api/auth/tags/user/:id
// @access --> Private