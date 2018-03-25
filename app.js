'use strict';

// NPM Package import
let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    expressSession  = require("express-session"),
    flash           = require("connect-flash");

require("dotenv").config();

// ROUTER import
let debtsRouter             = require("./routes/debt"),
    authenticationRouter    = require("./routes/authentication");

app.use(expressSession({
    secret: "SiongGukGuk HeHeHeHeHe",
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//broadcast flash message to all routes
app.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    console.log(res.locals.success);
    res.locals.error = req.flash("error");
    next();
});

app.get("/", function(req, res) {
    if (req.query.justLogin) {
        req.flash("success", "Login succesful!");
    } else if (req.query.justRegister) {
        req.flash("success", "Account created!");
    }
    res.redirect("/debts");
});

// ROUTER middlewares
app.use("/", authenticationRouter);
app.use("/debts", debtsRouter);

app.get("*", function(req, res) {
	res.send("webpage not found.");
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}.`);
    console.log("Press CTRL+C to exit.");
});
