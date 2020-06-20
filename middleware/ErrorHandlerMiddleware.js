module.exports = () => {
  return function (err, req, res, next) {
    const args = { error: err.message }
    res.status(500).render("error", args)
  }
}
