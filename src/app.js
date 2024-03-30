const express = require("express");
const app = express();
const PORT = 3000;

console.log(uuidv4());
console
app.get("/", (req, res) => {
  res.send("Change the world!");
});

app.post('/', (req, res) => {
  res.send('This is a post request!!');
})

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
