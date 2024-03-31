const express = require("express");
const mongoose = require("mongoose");
const Game = require("./models/game");

const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const books = [
  { name: "Atomic Habits", industry: "self-help" },
  { name: "Surviving a Startup", industry: "entrepreneurship" },
  { name: "Harry Potter", industry: "fantasy" },
];

const game = new Game({
  name: "Red Dead Redemption",
  dateRelease: 2018,
});

app.get("/", (req, res) => {
  res.send("AOOH SILVER");
});

app.get("/api/games", async (req, res) => {
  try {
    const result = await Game.find();
    res.json({ games: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/games", (req, res) => {
  console.log(req.body);
  const game = new Game(req.body);
  try {
    game.save();
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
