const BookService = new (require('../models/BookService'))()

module.exports = class BooksController {
  /**
   * Render home page displaying all books
   * for / route
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   */
  async all(req, res) {
    try {
      const args = {}
      const allBooks = await BookService.allBooks();
      return res.json(allBooks)
    } catch (err) {
      console.log(err.message)
    }
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
  book = (req, res) => {
    const id = req.params.id
    const args = {}
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
