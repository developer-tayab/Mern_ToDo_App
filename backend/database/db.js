const mongoose = require("mongoose");


mongoose.connect(`${process.env.MONGODB_URI}/ToDo_App`).then(() => {
  console.log("MongoDB is connected successfully!");
}).catch((error) => {
  console.log(error.message);
})


module.exports = mongoose.connection;