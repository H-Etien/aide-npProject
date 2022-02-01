const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/todolistDB");
};

//mongoDB schema
const itemSchema = new mongoose.Schema({
  name: String,
});

const listSchema = {
  name: String,
  items: [itemSchema],
};

//mongoDB model
const Item = mongoose.model("item", itemSchema);

//insérer dans la DB
connect()
  .then(async (connection) => {
    // const item = await Item.create({
    //   name: "Welcome to our todo list",
    // });
    // const item2 = await Item.create({
    //   name: "Hit the + button to add a new item",
    // });

    const itemFound = await Item.find({
      name: "Welcome to our todo list",
    });

    console.log(itemFound[0].name);
  })
  .catch((e) => console.log("ERROR " + e));

app.get("/", function (req, res) {
  connect()
    .then(async (connection) => {
      const itemFound = await Item.find({});
      res.render("list", {
        listTitle: "Today",
        newListItems: itemFound,
      });

      console.log(itemFound[0].name);
    })
    .catch((e) => console.log("ERROR " + e));
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  run();
  async function run() {
    const item = await Item.create({
      name: itemName,
    });
  }

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  //obtient l'id de l'item coché
  const checkedItemID = req.body.checkbox;

  run();
  async function run() {
    const item = await Item.findByIdAndRemove(checkedItemID);
    console.log("Deleted");

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
