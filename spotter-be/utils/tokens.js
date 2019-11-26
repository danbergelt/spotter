const jwt = require("jsonwebtoken");

exports.genToken = (id, sec, exp) => {
  return jwt.sign({ id: id }, sec, {
    expiresIn: exp
  });
};

exports.refreshToken = (res, token) => {
  res.cookie("toll", token, {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    // path: "/",
    expires: new Date(Number(new Date()) + 604800000)
  });
};
