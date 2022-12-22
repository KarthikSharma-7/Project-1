const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Model = require("../database/user");

exports.loginRequest = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ Error: "Login required to access.." });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ Error: "Login required to access.." });
    }
    const { _id } = payload;
    Model.findOne({ _id }).then((userInfo) => {
      userInfo.password = undefined;
      userInfo.cpassword = undefined;
      req.user = userInfo;
      next();
    });
  });
};
