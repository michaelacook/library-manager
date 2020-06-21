// require base controller
const Controller = require("./Controller.js")
// encapsulates the logic of interacting with the database
const BookService = new (require("../models/BookService"))()
const { Book } = require("../models/index.js")

module.exports = class BooksController extends Controller {
  constructor() {
    super()
  }

  /**
   * Redirect to the /books route
   * for / route
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   */
  home = (req, res) => {
    return res.redirect("/books")
  }

  /**
   * Render page displaying all books
   * for /books route
   * @param {Object} req
   * @param {Object} res
   */
  async all(req, res, next) {
    try {
      const args = this.createArgs(req)
      const results = await BookService.allBooks()
      const { count, rows } = results
      if (count === 0) {
        args.message = "Oops! There are currently no records"
      } else {
        args.count = count
        args.rows = rows
      }
      res.render("index", args)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Render new book page on GET
   * Add new book on POST
   * for /books/new route
   * @param {Object} req
   * @param {Object} res
   */
  async new(req, res, next) {
    try {
      if (req.method === "GET") {
        const args = this.createArgs(req)
        res.render("new-book", args)
      } else if (req.method === "POST") {
        const { title, author, genre, year } = req.body
        if (!title || !year) {
          return res.redirect("/books/new?error=missing_data")
        }
        let url = "/books/?"
        await BookService.addBook(title, author, genre, year)
          .then(() => {
            url += "success=book_added"
          })
          .catch((err) => {
            url += "error=general_error"
          })
        return res.redirect(url)
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Render book details view on GET
   * Update book details on POST
   * for /books/:id route
   * @param {Object} req
   * @param {Object} res
   * @param {Func} next
   */
  async book(req, res, next) {
    try {
      if (req.method === "GET") {
        const args = this.createArgs(req)
        const id = req.params.id
        const book = await BookService.findBook(id)
        if (book) {
          args.book = book
          res.render("update-book", args)
        } else {
          res.redirect("/books?error=does_not_exist")
        }
      } else if (req.method === "POST") {
        const { title, author, genre, year } = req.body
        const id = req.params.id
        if (!title || !author) {
          return res.redirect("/books/new?error=missing_data")
        }
        let url = "/books/" + req.params.id + "?"
        await BookService.updateBook(title, author, genre, year, id)
          .then(() => {
            url += "success=book_updated"
          })
          .catch(() => {
            url += "error=general_error"
          })
        res.redirect(url)
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Delete a book
   * for /books/:id/delete
   * @param {Object} req
   * @param {Object} res
   */
  async delete(req, res, next) {
    try {
      const id = req.params.id
      let url = "/books?"
      await BookService.deleteBook(id)
        .then(() => {
          url += "success=book_deleted"
        })
        .catch(() => {
          url += "error=general_error"
        })
      res.redirect(url)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
