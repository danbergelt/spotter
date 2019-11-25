const jwt = require("jsonwebtoken");

exports.genToken = (id, sec, exp) => {
  return jwt.sign({ id: id }, sec, {
    expiresIn: exp
  });
};

exports.refreshToken = (res, token) => {
  res.cookie("toll", token, {
    httpOnly: true,
    // path: "/",
    expires: new Date(Number(new Date()) + 604800000)
  });
};
