const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
};

module.exports = connectDB;