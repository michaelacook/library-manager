const express = require("express")
const router = express.Router()

// controllers
const BooksController = new (require("../controllers/BooksController"))()

router.get("/", (req, res) => BooksController.home(req, res))
router.get("/books", (req, res, next) => BooksController.all(req, res, next))
router.all("/books/new", (req, res, next) =>
  BooksController.new(req, res, next)
)
router.all("/books/:id", (req, res, next) =>
  BooksController.book(req, res, next)
)
router.post("/books/:id/delete", (req, res, next) =>
  BooksController.delete(req, res, next)
)

module.exports = router
