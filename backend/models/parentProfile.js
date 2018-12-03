const mongoose = require("mongoose");
const User = require("./User");
const Profile = require("./profileRegister");

var parentProfileSchema = new mongoose.Schema({
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
  // profiles: [{ type: mongoose.Schema.ObjectId, ref: Profile }],
  children: [],
  userId: { type: mongoose.Schema.ObjectId, ref: User }
});

var ParentProfile = mongoose.model("ParentProfile", parentProfileSchema);
module.exports = ParentProfile;
