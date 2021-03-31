const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const childSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    default: moment(),
  },
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
