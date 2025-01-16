const express = require("express");
const app = express();
require("dotenv").config();
const DB = require("./database/db")


app.use(express.json());
app.use(express.urlencoded({ extends: true }));



app.use("/", (req, res) => {
  res.send("This is working!")
});



app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});


