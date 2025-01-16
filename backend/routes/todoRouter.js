const Router = require("express").Router()


Router.get("/todo", (erq, res) => {
  console.log("Route is running !")
})

module.exports = Router;