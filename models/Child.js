const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    default: Date.now,
  },
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;