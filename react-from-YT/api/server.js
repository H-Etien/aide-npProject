const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3001;

const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());

// mongoose
//   .connect(
//     "mongodb+srv://adminEtien:Password@cluster0.7w7hq.mongodb.net/testDB?retryWrites=true&w=majority/mern-todo",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected to DB"))
//   .catch(console.error);

mongoose
  .connect("mongodb://127.0.0.1:27017/react-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  //crée une nouvelle base Todo
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.listen(port, () => {
  console.log("Serve started on " + port);
});
