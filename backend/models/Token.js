const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  token: { type: String },
  createDate: { type: Date, default: Date.now }
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
