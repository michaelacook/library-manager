const BookService = new (require("../models/BookService"))()

module.exports = class BooksController {
  /**
   * Render home page displaying all books
   * for / route
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   */
  async all(req, res, next) {
    const results = await BookService.allBooks()
    if (!results) {
      const err = new Error("No book listings")
      return next(err)
    }
    const { count, rows } = results
    const args = { count, rows }
    res.render("index", args)
  }

  /**
   * Render new book page on GET, pass form data to model on POST
   * for /books/new route
   * @param {Object} req
   * @param {Object} res
   */
  new = (req, res) => {
    if (req.method === "GET") {
      res.render("new-book")
    } else if (req.method === "POST") {
      // add a new book
    }
  }

  /**
   * Render book details view
   * for /books/:id route
   * @param {Object} req
   * @param {Object} res
   */
  async book(req, res, next) {
    const id = req.params.id
    const book = await BookService.findBook(id)
    console.log(book)
    if (!book) {
      const err = new Error("Invalid book ID passed")
      return next(err)
    }
    const args = { book }
    res.render("update-book", args)
  }

  /**
   * Delete a book
   * for /books/:id/delete
   * @param {Object} req
   * @param {Object} res
   */
  delete = (req, res) => {
    if (!req.params.id) {
      // handle no id passed
    }
  }
}
