module.exports = () => {
  return function (req, res, next) {
    res.status(500).render("page-not-found")
  }
}
