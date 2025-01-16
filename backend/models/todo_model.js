const mongoose = require("mongoose");


const TodoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("ToDo", TodoSchema);