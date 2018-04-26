'use strict';

let express = require("express");
let router = express.Router();
let moment = require("moment");
let db = require("../models");
let authMW = require("../middlewares/authentication");

// INDEX route
router.get("/", authMW.isLoggedIn, function(req, res) {
    db.debt.find(
        {}
    ).then(debts => {
        res.render("debts/index", {debts: debts, moment: moment});
    });
});

// NEW DEBT route
router.get("/new", authMW.isLoggedIn, function(req, res) {
    res.render("debts/new");
});

// CREATE DEBT route (to database)
router.post("/", authMW.isLoggedIn, function(req, res) {
    db.debt.create({
        title: req.body.title,
        startDate: new Date(req.body.startDate),
        capital: req.body.capital.replace(/[,\.]/g, ""),
        rate: req.body.rate
    }).then(debt => {
        if (req.body.descriptions && req.body.costs) {
            let descriptions = req.body.descriptions;
            let costs = req.body.costs;
            for (let i in descriptions) {
                debt.extras.push({
                    description: descriptions[i],
                    cost: Number(costs[i].replace(/[,\.]/g, ""))
                });
            }
        }
        return debt.save();
    }).then(debt => {
        req.flash("success", "New Debt created!");
        res.redirect("/debts");
    }).catch(err => {
        req.flash("error", "Failed to create New Debt.");
        res.redirect("/debts/new");
    });
});

// SHOW route
router.get("/:id", authMW.isLoggedIn, function(req, res) {
    db.debt.findById(
        req.params.id
    ).then(debt => {
        res.render("debts/show", {debt: debt, moment: moment, giveComma: giveComma});
    });
});

// EDIT route
router.get("/:id/edit", authMW.isLoggedIn, function(req, res) {
    db.debt.findById(
        req.params.id
    ).then(debt => {
        res.render("debts/edit", {debt: debt, moment: moment, giveComma: giveComma});
    });
});

// PRINT route
router.get("/:id/print", authMW.isLoggedIn, function(req, res) {
    db.debt.findById(
        req.params.id
    ).then(debt => {
        res.render("debts/print", {debt: debt, moment: moment, giveComma: giveComma});
    });
});

// UPDATE route
router.put("/:id", authMW.isLoggedIn, function(req, res) {
    db.debt.findByIdAndUpdate(
        req.params.id,
        { $set: {
                title: req.body.title,
                startDate: new Date(req.body.startDate),
                capital: req.body.capital.replace(/[,\.]/g, ""),
                rate: req.body.rate
            }
        },
        {
            new: true
        }
    ).then(debt => {
        while (debt.extras.length) 
            debt.extras.pop();
        if (req.body.descriptions && req.body.costs) {
            let descriptions = req.body.descriptions;
            let costs = req.body.costs;
            for (let i in descriptions) {
                debt.extras.push({
                    description: descriptions[i],
                    cost: Number(costs[i].replace(/[,\.]/g, ""))
                });
            }
        }
        return debt.save();
    }).then(debt => {
        req.flash("success", "Debt updated!");
        res.redirect(`/debts/${debt._id}`);
    }).catch (err => {
        req.flash("error", "Failed to update Debt.");
        res.redirect(`back`);
    });
});

// DELETE route
router.delete("/:id", authMW.isLoggedIn, function(req, res) {
    db.debt.findByIdAndRemove(
        req.params.id
    ).then(() => {
        req.flash("success", "Debt deleted!");
        res.redirect("/debts");
    }).catch(err => {
        req.flash("error", "Failed to delete Debt.");
        res.redirect("back");
    });
});

module.exports = router;

function giveComma(numberStr) {
	let noComma = (numberStr+'').replace(/[,\.]/g, "");
	let withComma = Number(noComma).toLocaleString('en', {
		maximumSignificantDigits : 21,
		maximumFractionDigits: 20
	});
	return withComma;
}