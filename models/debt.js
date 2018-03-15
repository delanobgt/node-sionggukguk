'use strict';

let mongoose = require("mongoose");

let ExtraSchema = new mongoose.Schema({
	description: String,
	cost: Number
});

let DebtSchema = new mongoose.Schema({
	title: String,
	startDate: Date,
	capital: Number,
	rate: Number,
	extras: [ExtraSchema]
});

module.exports = mongoose.model("Debt", DebtSchema);
