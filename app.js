var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
//var usersRouter = require('./routes/users');
var quizRouter = require("./routes/quiz");
var coursesRouter = require("./routes/course");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
//var usersRouter = require('./routes/users');
var quizRouter = require("./routes/quiz");
var coursesRouter = require("./routes/course");

//export libraries
var config = require("./config/globals");
var mongoose = require("mongoose");
var hbs = require("hbs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routing config
app.use("/", indexRouter);
//app.use('/users', usersRouter);
app.use("/quiz", quizRouter);
app.use("/courses", coursesRouter);

//config mongoose
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }) //connect
  .then((message) => {
    //do something after connecting
    console.log("Connected Successfully!");
  })
  .catch((err) => {
    console.log("Error while connecting!" + err);
  }); //catch any errors

//Add helper methods for formattig date and dropdown box
hbs.registerHelper("createOption", (currentvalue, selectedValue) => {
  //initialize selected property
  var selectedProperty = '';
  //if values are equal
  if (currentvalue == selectedValue) {
    selectedProperty = 'selected';
  }
  //generate html code
  var option = '<option '+ selectedProperty + '>' + currentvalue + '</option>'
  console.log(option);
  return new hbs.SafeString(option); // <option>Value</option>
});

//HBS helper
// hbs.registerHelper('toShortDate', (longDateValue)=>{
//   return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
// })
hbs.registerHelper('toShortDate', (longDateValue) => {
  // Check if longDateValue is a valid Date object
  if (longDateValue instanceof Date && !isNaN(longDateValue)) {
    // Format the date using toLocaleDateString
    return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
  } else {
    // Handle the case where longDateValue is not a valid Date
    return new hbs.SafeString('Invalid Date');
  }
});


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

//export libraries
var config = require("./config/globals");
var mongoose = require("mongoose");
var hbs = require("hbs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routing config
app.use("/", indexRouter);
//app.use('/users', usersRouter);
app.use("/quiz", quizRouter);
app.use("/courses", coursesRouter);

//config mongoose
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }) //connect
  .then((message) => {
    //do something after connecting
    console.log("Connected Successfully!");
  })
  .catch((err) => {
    console.log("Error while connecting!" + err);
  }); //catch any errors

//Add helper methods for formattig date and dropdown box
hbs.registerHelper("createOption", (currentvalue, selectedValue) => {
  //initialize selected property
  var selectedProperty = '';
  //if values are equal
  if (currentvalue == selectedValue) {
    selectedProperty = 'selected';
  }
  //generate html code
  var option = '<option '+ selectedProperty + '>' + currentvalue + '</option>'
  console.log(option);
  return new hbs.SafeString(option); // <option>Value</option>
});

//HBS helper
// hbs.registerHelper('toShortDate', (longDateValue)=>{
//   return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
// })
hbs.registerHelper('toShortDate', (longDateValue) => {
  // Check if longDateValue is a valid Date object
  if (longDateValue instanceof Date && !isNaN(longDateValue)) {
    // Format the date using toLocaleDateString
    return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
  } else {
    // Handle the case where longDateValue is not a valid Date
    return new hbs.SafeString('Invalid Date');
  }
});


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
