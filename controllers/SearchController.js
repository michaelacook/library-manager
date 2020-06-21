// require base controller
const Controller = require("./Controller.js")
// encapsulates the logic of interacting with the database
const BookService = new (require("../models/BookService"))()
// maps query strings to error and success messages to be sent to views
const messages = require("../messages.json")
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
      console.log(query)
      const results = await BookService.search(query)
      if (results) {
        return res.json(results)
      }
    } catch (err) {
      next(err)
    }
  }
}
