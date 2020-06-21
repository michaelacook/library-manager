/*
The BookService class encapsulates the logic of querying
and returning data from the Books model 
*/

const { Book } = require("./index.js")
const { Op } = require("./index.js").Sequelize

module.exports = class BookService {
  /**
   * Get all book entries in the database
   * @return {Promise}
   */
  async allBooks() {
    await Book.sync()
    const results = await Book.findAndCountAll({
      order: [["title", "ASC"]],
    })
    if (results) {
      return results
    } else {
      return false
    }
  }

  /**
   * Get an individual book by id
   * @param {Number} id - database primary key
   * @return {Promise}
   */
  async findBook(id) {
    await Book.sync()
    const result = await Book.findByPk(id)
    if (!result) {
      return false
    }
    return result
  }

  /**
   * Add a new book row to the database
   * @param {String} title - book title
   * @param {String} author - book author
   * @param {String} genre - book genre
   * @param  {String} year - year published
   * @return {Promise}
   */
  async addBook(title, author, genre, year) {
    await Book.sync()
    await Book.create({
      title,
      author,
      genre,
      year,
    }).catch((err) => {
      return Promise.reject()
    })
  }

  /**
   * Edit a book record
   * @param {String} title - book title
   * @param {String} author - book author
   * @param {String} genre - book genre
   * @param {String} year - year published
   * @param {Number} id - record primary key
   * @return {Promise}
   */
  async updateBook(title, author, genre, year, id) {
    await Book.sync()
    const book = await this.findBook(id)
    if (book) {
      await book
        .update({
          title,
          author,
          genre,
          year,
        })
        .catch((err) => {
          return Promise.reject()
        })
    } else {
      return Promise.reject(false)
    }
  }

  /**
   * Delete a book record
   * @param {Number} id - record primary key
   * @return {Promise}
   */
  async deleteBook(id) {
    await Book.sync()
    const book = await Book.findByPk(id)
    if (book) {
      await book.destroy().catch((err) => {
        return Promise.reject()
      })
    } else {
      return Promise.reject()
    }
  }

  /**
   * Search database for records at least partially matching a query
   * @param {String} query - search term
   * @return {Object} results
   * @return {Boolean} false on fail
   */
  async search(query, offset = 1) {
    await Book.sync()
    const results = await Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
          { genre: { [Op.like]: `%${query}%` } },
          { year: { [Op.like]: `%${query}%` } },
        ],
      },
    })
    if (!results) {
      return false
    }
    return results
  }
}
