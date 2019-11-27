const jwt = require("jsonwebtoken");

exports.genToken = (id, sec, exp) => {
  return jwt.sign({ id: id }, sec, {
    expiresIn: exp
  });
};

exports.refreshToken = (res, token) => {
  res.cookie("toll", token, {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Number(new Date()) + 604800000)
  });
};

exports.clearRefreshToken = res => {
  res.cookie("toll", "", {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Date.now() * 0)
  });
};
