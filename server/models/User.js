const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    default: "user",
  },

  password: {
    type: String,
    required: true,
  },

  //   resetPasswordToken: {
  //     type: String,
  //     default: null,
  //   },

  //   resetPasswordExpires: {
  //     type: Date,
  //     default: null,
  //   },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
