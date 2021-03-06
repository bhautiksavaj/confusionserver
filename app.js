var createError = require("http-errors");
var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var dishRouter = require("./routes/dishRouter");
var leaderRouter = require("./routes/leaderRouter");
var promoRouter = require("./routes/promoRouter");

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI; //For local database
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected to server");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
