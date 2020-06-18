/*
The BookService class encapsulates the logic of querying
and returning data from the Books model 
*/

const { Book } = require("./index.js")

module.exports = class BookService {
  /**
   * Get all book entries in the database
   */

  async allBooks() {
    try {
      await Book.sync()
      const results = await Book.findAndCountAll({
        order: [["title", "ASC"]],
      })
      return results
    } catch (err) {
      console.error(err.message)
      return false
    }
  }

  /**
   * Get an individual book by id
   * @param {Number} id - database primary key
   */
  async findBook(id) {
    try {
      await Book.sync()
      const result = await Book.findByPk(id)
      if (!result) {
        return false
      }
      return result
    } catch (err) {
      console.error(err.message)
      return false
    }
  }
}
