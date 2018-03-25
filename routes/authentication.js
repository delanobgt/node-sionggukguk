'use strict';

let express         = require("express"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("../models/user.js"),
    router          = express.Router();

//auth stuff
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/register", function(req, res) {
  res.render("authentication/register");
});

router.post("/register", function(req, res) {
  User.register(
      new User({username: req.body.username}),
      req.body.password,
      function(err, user) {
          if (err) {
              console.log(err);
              req.flash("error", "Login failed.")
              return res.redirect("/register");
          }
          passport.authenticate("local")(req, res, function() {
              res.redirect("/?justRegister=true");
          })
      }
  )
});

router.get("/login", function(req, res) {
  res.render("authentication/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/?justLogin=true",
  failureRedirect: "/login"
}), function(req, res) {
});

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You have logout.");
  res.redirect("/login");
});

module.exports = router;
