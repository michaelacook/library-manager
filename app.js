// const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const indexRouter = require("./routes/index")

const errorHandler = require("./middleware/ErrorHandlerMiddleware")()
const notFoundHandler = require("./middleware/NotFoundMiddleware")()

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// routes
app.use("/", indexRouter)

// error handling middleware
app.use(errorHandler)
// 404 middleware
app.use(notFoundHandler)

module.exports = app
