import express from "express";
import mongoose from "mongoose";
import Potato from "./models/game";
import cors from "cors";
import { Request, Response } from "express";

const app = express();
mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

if(!CONNECTION){
  console.error("MongoDB connection string not provided.");
  process.exit(1);
}


app.get("/", (req: Request, res: Response) => {
  res.send("Home Page!");
});

app.get("/api/games", async (req: Request, res: Response) => {
  try {
    const result = await Potato.find();
    res.json({ games: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/games/:id", async (req: Request, res: Response) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  const gameId = req.params.id;
  try {
    const g = await Potato.findById(gameId);
    if (!g) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json({ game: g });
    }
  } catch (err) {
    res.status(404).json({ error: "Something wrong in the server" });
  }
});

app.get("/api/orders/:id", async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const result = await Potato.findOne({ "orders._id": orderId });
    if (result) {
      res.json(result.orders);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res
      .status(404)
      .json({ error: "There was an internal problem, please try again later" });
  }
});

app.put("/api/games/:id", async (req: Request, res:Response) => {
  const gameId = req.params.id;
  try {
    const game = await Potato.findOneAndReplace({ _id: gameId }, req.body, {
      new: true,
    });
    console.log(game);
    res.json({ game });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Something went wrong, try again later" });
  }
});

app.patch("/api/games/:id", async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const game = await Potato.findOneAndUpdate({ _id: gameId }, req.body, {
      new: true,
    });
    console.log(game);
    res.json({ game });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Something went wrong to PATCH" });
  }
});

app.patch("/api/orders/:id", async (req: Request, res: Response) => {
  console.log(req.params);
  const orderId = req.params.id;
  req.body._id = orderId;
  try {
    const result = await Potato.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$": req.body } },
      { new: true }
    );
    console.log(result);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Somethign went wrong" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/games/:id", async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const result = await Potato.deleteOne({ _id: gameId });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({
      error: "Error to delete. Something went wrong, try again later",
    });
  }
});

app.post("/api/games", async (req: Request, res: Response) => {
  console.log(req.body);
  const game = new Potato(req.body);
  try {
    await game.save();
    res.status(201).json({ game });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/", (req: Request, res: Response) => {
  res.send("This is a post request");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
