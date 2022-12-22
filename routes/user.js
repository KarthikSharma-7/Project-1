const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const postModel = require("../database/post");
const { loginRequest } = require("../middleware/loginMiddleware");
const Model = require("../database/user");

router.get("/user/:id", loginRequest, (req, res) => {
  Model.findOne({ _id: req.params.id }, { password: 0, cpassword: 0 })
    .then((user) => {
      postModel.find({ postedBy: req.params.id }).exec((err, posts) => {
        if (err) {
          console.log(err, "err");
          res.status(422).json({ Error: err });
        }
        res.status(200).json({ user, posts });
      });
    })
    .catch((err) => {
      res.status(422).json({ Error: "User not found" });
    });
});

module.exports = router;
