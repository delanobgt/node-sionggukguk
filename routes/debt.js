'use strict';

let express = require("express");
let router = express.Router();

let debtModel = require("../models/debt");

// INDEX route
router.get("/debts", function(req, res) {
	let newDocument = {
		startDate: "2000-11-12",
		capital: 100000,
		rate: 6,
		extrass: [ 
			{
				description: "Apartemen",
				cost: 5000
			},
			{
				description: "Rumah",
				cost: 10000
			}
		]
	}
	console.log(newDocument);
	debtModel.create(newDocument, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	})

	res.render("debts/index");
});

module.exports = router;
