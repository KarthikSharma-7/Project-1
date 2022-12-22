require("dotenv").config();
const mongoose = require("mongoose");

exports.mongoConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://sharma:${process.env.MONGO_DB_PASSWORD}@cluster0.kghdi.mongodb.net/${process.env.MONGO_DB_COLLECTION}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log("Connected");
    })
    .catch((e) => {
      console.log(e);
    });
};
