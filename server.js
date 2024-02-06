const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const Todo = require("./models/todo");
const User = require("./models/user");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.post("/api/users", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    user = new User({ username: req.body.username });
    await user.save();
  }
  res.send(user);
});

app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({ username: req.query.username });
  res.send(todos);
});

app.post("/api/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: false,
    username: req.body.username,
  });
  await todo.save();
  res.send(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.send(todo);
});
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
