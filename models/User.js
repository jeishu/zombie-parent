const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: moment(),
  },
  lastLogin: {
    type: Date,
    default: moment(),
  },
  child: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  activeChild: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  careOptions: {
    showBottle: { type: Boolean, required: true, default: true },
    showNurse: { type: Boolean, required: true, default: true },
    showNap: { type: Boolean, required: true, default: true },
    showDiaper: { type: Boolean, required: true, default: true },
  },
  statsView: {
    lastView: { type: String },
    lastRange: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;