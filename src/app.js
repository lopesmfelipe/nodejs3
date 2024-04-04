const express = require("express");
const mongoose = require("mongoose");
const Potato = require("./models/game");

const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.get("/", (req, res) => {
  res.send("AOOH SILVER");
});

app.get("/api/games", async (req, res) => {
  try {
    const result = await Potato.find();
    res.json({ games: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/games/:id", async (req, res) => {
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
    res.status(500).json({ error: "Hey user! Something wrong in the server" });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  const gameId = req.params.id;
  await Potato.replaceOne();
  
});

app.post("/api/games", async (req, res) => {
  console.log(req.body);
  const game = new Potato(req.body);
  try {
    await game.save();
    res.status(201).json({ game });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/", (req, res) => {
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
