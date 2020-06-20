module.exports = () => {
  return function (err, req, res, next) {
    const args = { error: err.message }
    res.render("error", args)
  }
}
