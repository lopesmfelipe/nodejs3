import {Schema, model} from 'mongoose'

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

const Potato = model("game", gameSchema);
export default Potato;
