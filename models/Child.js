const mongoose,
  { Schema } = require("mongoose");

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
