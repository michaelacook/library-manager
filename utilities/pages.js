/**
 * Get the total number of pages of results from a database query
 * @param {Number} count - number of database records
 * @return {Number} pages - total number of pages
 */
module.exports = (count) => {
  return Math.ceil(count / 12)
}
