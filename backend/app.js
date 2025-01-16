const express = require("express");
const app = express();
require("dotenv").config();
const DB = require("./database/db")
const todoRoutes = require("./routes/todoRouter")



app.use(express.json());
app.use(express.urlencoded({ extends: true }));


// {Routes}
app.use("/api", todoRoutes);






app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});


