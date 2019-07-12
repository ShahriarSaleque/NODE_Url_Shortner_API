const config = require("config");
const mongoose = require("mongoose");
const db = config.get("mongoURI");

//connect to db function
const connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectdb;
