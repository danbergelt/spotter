const Err = require("../utils/Err");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack);

  // Mongoose bad Object ID
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new Err(message, 404);
  }

  // Dup field
  if (err.code === 11000) {
    const message = "Duplicate field value detected";
    error = new Err(message, 400);
  }

  // Validation err
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new Err(message, 400);
  }

  // Misc.

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error"
  });
};

module.exports = errorHandler;
