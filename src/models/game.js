const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: String,
  releaseDate: Number,
});

module.exports = mongoose.model("games", gameSchema);
