const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

var Leaders = mongoose.model("Leader", leaderSchema);

module.exports = Leaders;
