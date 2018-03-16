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

// NEW DEBT route
router.get("/debts/new", function(req, res) {
    res.render("debts/new");
});

// CREATE DEBT route (to database)
router.post("/debts", function(req, res) {
    debtModel.create({
        title: req.body.title,
        startDate: Date(req.body.startDate),
        capital: req.body.capital,
        rate: req.body.rate
    }).then(function(debt) {
        if (req.body.descriptions && req.body.costs) {
            let descriptions = req.body.descriptions;
            let costs = req.body.costs;
            for (let i = 0; i < descriptions.length; i++) {
                debt.extras.push({
                    description: descriptions[i],
                    cost: costs[i]
                });
            }
        }
        return debt.save();
    }).then(function(debt) {
        return debtModel.find({});
    }).then(function(debts) {
        res.render("debts/index", {debts: debts});
    });
});

// SHOW route
router.get("/debts/:id", function(req, res) {
    debtModel.findById(
        req.params.id
    ).then(debt => {
        res.render("debts/show", {debt: debt});
    });
});

module.exports = router;
