
const router = require("express").Router();
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });


  // Render Edit Todo Form
router.get("/edit/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.findById(_id)
      .then((todo) => {
        res.render("edit", { todo });
      })
      .catch((err) => console.log(err));
  });
  
  // Update Todo
  router.post("/edit/todo/:_id", (req, res) => {
    const { _id } = req.params;
    const { todo } = req.body;
    Todo.updateOne({ _id }, { $set: { todo } })
      .then(() => {
        console.log("Updated Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

module.exports = router;
