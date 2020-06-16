module.exports = () => {
  return function (req, res, next) {
    // render a NotFound view in the future
    res.send(
      JSON.stringify({
        error: {
          "status code": "404",
          message: "Not Found",
        },
      })
    )
    next()
  }
}
