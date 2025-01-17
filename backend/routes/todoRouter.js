// === Backend Fixes ===
const Router = require("express").Router();
const todoSchema = require("../models/todo_model");

// Create Todo
Router.post("/create", async (req, res) => {
  const { task, content } = req.body;
  if (task && content) {
    try {
      const todoCreate = await todoSchema.create({ task, content, completed: false });
      console.log(todoCreate);
      return res.json(todoCreate);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create task." });
    }
  } else {
    return res.status(400).json({ error: "Task and content are required." });
  }
});

// Get Todos
Router.get("/todo", async (req, res) => {
  try {
    const findTodo = await todoSchema.find();
    res.json(findTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

// Update Todo
Router.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { task, content, completed } = req.body;
  try {
    const tdUpdate = await todoSchema.findByIdAndUpdate(
      id,
      { task, content, completed },
      { new: true }
    );
    res.json(tdUpdate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task." });
  }
});

// Toggle Status
Router.put("/todo/status/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findAndUpdateStatus = await todoSchema.findById(id);
    findAndUpdateStatus.completed = !findAndUpdateStatus.completed;
    await findAndUpdateStatus.save();
    res.json(findAndUpdateStatus);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status." });
  }
});

// Delete Todo
Router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await todoSchema.findByIdAndDelete(id);
    res.json("Deleted successfully!");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task." });
  }
});

module.exports = Router;