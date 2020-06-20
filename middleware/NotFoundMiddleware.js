module.exports = () => {
  return function (req, res, next) {
    res.status(404).render("page-not-found")
  }
}
