const mongoose,
  { Schema } = require("mongoose");

const actionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  beginTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
      type: Date,
      default: Date.now,
  },
  lastedUpdatedBy: {type: Schema.Types.ObjectId, ref: "User" },
  child: {type: Schema.Types.ObjectId, ref: "Child" },
  foodOz: {
      type: Number
  },
  diaperContents: {
      pee: { type: Boolean },
      poo: { type: Boolean },
  },
  endedByUser: {
      type: Boolean,
      default: false,
  }

});

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
