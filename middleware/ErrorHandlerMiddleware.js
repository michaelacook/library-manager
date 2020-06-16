module.exports = () => {
  return function (err, req, res, next) {
    // in the future render an Error view
    res.send(
      JSON.stringify({
        error: {
          "status code": "500",
          message: "Something went wrong",
        },
      })
    )
    next()
  }
}
