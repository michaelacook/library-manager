module.exports = () => {
  return function (err, req, res, next) {
    res.render("error")
  }
}
