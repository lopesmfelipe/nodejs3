import { HydratedDocument, Schema, model } from "mongoose";

interface IOrder {
  description: string;
  amountInCents?: number;
}

interface IGame {
  name: string;
  releaseDate: number;
  orders?: IOrder[];
}

const gameSchema = new Schema<IGame>({
  name: {
    type: String,
    required: true,
  },
  releaseDate: Number,
  orders: [
    {
      description: String,
      amountInCents: Number,
    },
  ],
});

const Potato = model("game", gameSchema);

const g: HydratedDocument<IGame> = new Potato({
  name: "Outlast 2",
  releaseDate: 2013,
});

console.log(g.name, g.releaseDate);
export default Potato;
