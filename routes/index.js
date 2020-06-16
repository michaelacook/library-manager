const express = require("express")
const router = express.Router()

router.get("/", (req, res) => res.send(JSON.stringify({ message: "home" })))

router.get("/books", (req, res) =>
  res.send(JSON.stringify({ message: "books route" }))
)
router.get("/books/new", (req, res) =>
  res.send(JSON.stringify({ message: "new books route" }))
)
router.get("/books/:id", (req, res) =>
  res.send(JSON.stringify({ message: "individual book route" }))
)
router.post("books/:id", (req, res) =>
  res.send(JSON.stringify({ message: "post new book route" }))
)
router.post("/books/:id/delete", (req, res) =>
  res.send(JSON.stringify({ message: "delete book route" }))
)

module.exports = router
