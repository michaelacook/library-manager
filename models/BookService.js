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
      const results = await Book.findAndCountAll()
      return results
    } catch (err) {
      console.error(err.message)
      return false
    }
  }
}
