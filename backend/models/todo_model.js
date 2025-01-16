const mongoose = require("mongoose");


const TodoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("ToDo", TodoSchema);