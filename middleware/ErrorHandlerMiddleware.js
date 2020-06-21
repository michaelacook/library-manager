module.exports = () => {
  return function (err, req, res, next) {
    const args = { error: err }
    res.status(500).render("error", args)
  }
}
