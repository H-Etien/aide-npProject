const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;

const app = express();

const MONGODB_URL =
  "mongodb+srv://adminEtien:Password@cluster0.7w7hq.mongodb.net/np-Project-DB?retryWrites=true&w=majority/userData";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("connected to DB"))
  .catch(console.error);

// si on veut utiliser le chemin relative ../, utiliser le path.resolve avec path = require ("path")
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../client/src/index.html"));
});

app.listen(port, () => {
  console.log("connected to port " + port);
});
