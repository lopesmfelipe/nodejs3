const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseDate: Number,
});

module.exports = mongoose.model("games", gameSchema);
