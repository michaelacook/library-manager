/**
 * Calculates the offset that is passed to the database query to paginate results
 * @param {Number} page - current page of results
 * @return {Number} offset - offset for database query
 */
module.exports = (page) => {
  if (page === 0) {
    page = 1
  }
  const limit = 12
  return (page - 1) * limit
}
