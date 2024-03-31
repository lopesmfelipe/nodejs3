const express = require("express");
const mongoose = require("mongoose");
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

const home = "Home Page";

app.get("/", (req, res) => {
  res.send({ home });
});

app.get("/api/books", (req, res) => {
  res.send({ data: books });
});

app.post("/api/register", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", (req, res) => {
  res.send("This is a post request!!");
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
