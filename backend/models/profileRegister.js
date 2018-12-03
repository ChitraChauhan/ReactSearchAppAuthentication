const mongoose = require("mongoose");
const User = require("./User");

var profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fathersName: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  maritalStatus: {
    type: String,
    required: true
  },
  userId: { type: mongoose.Schema.ObjectId, ref: User }
});

var Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
