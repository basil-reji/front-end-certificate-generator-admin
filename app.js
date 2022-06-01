var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var engine = require("express-handlebars");
var db = require("./config/db");
var session = require("express-session");
var fileUpload = require("express-fileupload");
var engineHelper = require("./helpers/hbsHelper");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminsRouter = require("./routes/admins");

var app = express();

const hbs = engine.create({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: `${__dirname}/views`,
    partialsDir: `${__dirname}/views/partials`,
    helpers: engineHelper,
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//file uploading
app.use(fileUpload()); 

//session
app.use(session({ 
    secret: "!(One234567eighT)!", 
    cookie: { maxAge: 6000000 } 
})); 

//db connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Data Base Connected...");
    }
});

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/admin", adminsRouter);

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
    
    pagename = `${err.status}`;
    res.render("error", {
        title: `${pagename} | Site`,
    });
});

module.exports = app;