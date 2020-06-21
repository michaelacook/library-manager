// require base controller
const Controller = require("./Controller.js")
// encapsulates the logic of interacting with the database
const BookService = new (require("../models/BookService"))()
const { Book } = require("../models/index.js")

module.exports = class SearchController extends Controller {
  constructor() {
    super()
  }

  /**
   * Pass search query to model and display results
   * @param {Object} req - HTTP request object
   * @param {Object} res  - HTTP response object
   * @param {Func} next  - next middleware function
   */
  async search(req, res, next) {
    try {
      const args = this.createArgs(req)
      const query = req.query.search
      if (query) {
        const results = await BookService.search(query)
        const { count, rows } = results
        if (count) {
          return res.json(results)
        } else {
          res.json({ message: "No results." })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}
