const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const actionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  beginTime: {
    type: Date,
    default: moment(),
  },
  endTime: {
    type: Date,
    default: moment(),
  },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  child: { type: Schema.Types.ObjectId, ref: "Child" },
  foodOz: {
    type: Number,
  },
  sleepDuration: { type: Number },
  nurse: {
    left: { type: Boolean },
    leftSeconds: { type: Number },
    right: { type: Boolean },
    rightSeconds: { type: Number },
  },
  diaperContents: {
    pee: { type: Boolean },
    poo: { type: Boolean },
  },
  endedByUser: {
    type: Boolean,
    default: false,
  },
});

actionSchema.methods.setSleep = function () {  
  this.sleepDuration = moment
    .duration(beginTime.diff(endTime))
    .seconds();
  return this.sleepDuration;
};

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
