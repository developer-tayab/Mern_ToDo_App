const Router = require("express").Router()
const todoSchema = require("../models/todo_model")


Router.post("/todo", async (req, res) => {
  const { task, content } = req.body
  const todoCreate = await todoSchema.create({ task, content });
  console.log(todoCreate);
  res.json(todoCreate)

})
Router.get("/todo", async (req, res) => {
  const findTodo = await todoSchema.find();
  res.json(findTodo);
});
Router.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { task, content, completed } = req.body
  // console.log(task, content)
  const tdUpdate = await todoSchema.findOneAndUpdate({ id, task, content });
  res.json(tdUpdate);
})

Router.put("/todo/status/:status", async (req, res) => {
  const { status } = req.params;
  console.log(status)
  const findAndUpdateStatus = await todoSchema.findOneAndUpdate({ status });
  findAndUpdateStatus.completed = !findAndUpdateStatus.completed
  await findAndUpdateStatus.save();
  console.log(findAndUpdateStatus)
})

Router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await todoSchema.findOneAndDelete(id);
  res.json("deleted is successfully!")
  console.log(deletedTodo);
})


module.exports = Router;