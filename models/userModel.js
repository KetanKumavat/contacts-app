const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email Address"],
    unique: [true, "Email Address Already Taken"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
  },
},
    {
    timestamps: true
    }
);

module.exports = mongoose.model("User",userSchema);