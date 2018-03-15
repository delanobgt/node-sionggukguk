'use strict';

let express = require("express");
let router = express.Router();

let debtModel = require("../models/debt");

// INDEX route
router.get("/debts", function(req, res) {
	debtModel.find(
		{}
	).limit(100).then(function(debts) {
		res.render("debts/index", {debts: debts});
	});
});

// NEW route
router.get("/debts/new", function(req, res) {
	res.render("debts/new");
});

// CREATE route
router.post("/debts", function(req, res) {
	console.log(req.body);
});

// SHOW route
router.get("/debts/:id", function(req, res) {

});

module.exports = router;
