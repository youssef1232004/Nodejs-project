const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      governorate: { type: String, trim: true},
      city: { type: String, trim: true },
      neighborhood: { type: String, trim: true },
      street: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
