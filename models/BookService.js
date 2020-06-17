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
      const results = await Book.findAndCountAll()
      console.log(results)
      return results
    } catch (err) {
      console.error(err.message)
    }
  }
}
