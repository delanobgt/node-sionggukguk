'use strict';

let mongoose = require("mongoose");

let DebtSchema = new mongoose.Schema({
	title: String,
	startDate: Date,
	capital: Number,
	rate: Number,
	extras: [{
		description: String,
		cost: Number
	}]
});

module.exports = mongoose.model("Debt", DebtSchema);
