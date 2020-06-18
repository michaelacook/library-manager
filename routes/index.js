const express = require("express")
const router = express.Router()

// controllers
const BooksController = new (require("../controllers/BooksController"))()

router.get("/", (req, res, next) => BooksController.all(req, res, next))
router.get("/books", (req, res) =>
  res.send(JSON.stringify({ message: "books route" }))
)
router.get("/books/new", (req, res) => BooksController.new(req, res))
router.get("/books/:id", (req, res, next) =>
  BooksController.book(req, res, next)
)
router.post("books/:id", (req, res) =>
  res.send(JSON.stringify({ message: "post new book route" }))
)
router.post("/books/:id/delete", (req, res) =>
  res.send(JSON.stringify({ message: "delete book route" }))
)

module.exports = router
