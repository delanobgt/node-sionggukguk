'use strict';

// NPM Package import
let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");

// ROUTER import
let debtsRouter = require("./routes/debt");;

// MODEL import


mongoose.connect("mongodb://localhost/sionggukguk");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.send("halo");
});

app.get("/login", function(req, res) {
});

// ROUTER middlewares
app.use(debtsRouter);

// start the server
const PORT = 1234;
app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}.`);
    console.log("Press CTRL+C to exit.");
})