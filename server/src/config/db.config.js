const mongoose = require("mongoose");

const { MONGO_URI, NODE_ENV } = require("./server.config");

const connectToDB = async () => {
  try {
    if (NODE_ENV === "development") {
      console.log(MONGO_URI);
      await mongoose.connect(MONGO_URI);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

module.exports = connectToDB;
