const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
      type: String,
      unique: true
  },
  // password: {
  //   type: String,
  // },
  uid: { 
    type: String,
    required: true,
    unique: true,
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
  lastViewedChild: { type: Schema.Types.ObjectId, ref: "Child"},
  careOptions: {
    showBottle: { type: Boolean, default: true },
    showNurse: { type: Boolean, default: true },
    showNap: { type: Boolean, default: true },
    showDiaper: { type: Boolean, default: true },
  },
  statsView: {
    lastView: { type: String },
    lastRange: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;