// require base controller
const Controller = require("./Controller.js")
// encapsulates the logic of interacting with the database
const BookService = new (require("../models/BookService"))()
// module for calculating pagination offset
const getOffset = require("../utilities/offset.js")
// module for calculating number of pages of results
const getPages = require("../utilities/pages.js")

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
      const currentPage = req.query.page
      if (query) {
        if (!currentPage) {
          return res.redirect(`/search?search=${query}&page=1`)
        }
        const offset = getOffset(currentPage)
        const results = await BookService.search(query, offset)
        const { count, rows } = results
        if (count) {
          const numberOfPages = getPages(count)
          args.count = count
          args.rows = rows
          args.url = `/search?search=${query}&`
          args.currentPage = currentPage
          args.pages = numberOfPages
          args.searchTerm = query
        } else {
          return res.redirect("/search?error=no_results")
        }
      }
      return res.render("search-results", args)
    } catch (err) {
      next(err)
    }
  }
}
