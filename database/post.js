const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
  },
});

const postModel = new mongoose.model("PostData", postSchema);
module.exports = postModel;
