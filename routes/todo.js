const router = require("express").Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  const allTodo = await Todo.find();
  res.render("index", { todo: allTodo });
});

// Add a new todo
router.post("/add/todo", (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });

  newTodo
    .save()
    .then(() => {
      console.log("Successfully added todo!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// Edit todo - Render edit page
router.get("/edit/todo/:_id", async (req, res) => {
  const { _id } = req.params;
  const todo = await Todo.findById(_id);
  res.render("edit", { todo });
});

// Update todo
router.post("/edit/todo/:_id", async (req, res) => {
  const { _id } = req.params;
  const { todo } = req.body;
  await Todo.findByIdAndUpdate(_id, { todo });
  console.log("Successfully updated todo!");
  res.redirect("/");
});

// Delete todo
router.get("/delete/todo/:_id", (req, res) => {
  const { _id } = req.params;
  Todo.deleteOne({ _id })
    .then(() => {
      console.log("Deleted Todo Successfully!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
