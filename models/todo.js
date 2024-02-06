// models/todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  username: String, // Link to the User model
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
