import {Schema, model} from 'mongoose'
const mongoose = require("mongoose");

const gameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  releaseDate: Number,
  orders: [
    {
      description: String,
      amountInCents: Number
    }
  ]
});

export const Potato = model("games", gameSchema);
