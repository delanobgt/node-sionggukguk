'use strict';

let express = require("express");
let router = express.Router();

let debtModel = require("../models/debt");

// INDEX route
router.get("/debts", function(req, res) {
    debtModel.find(
        {}
    ).then(debts => {
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
        startDate: new Date(req.body.startDate),
        capital: req.body.capital,
        rate: req.body.rate
    }).then(debt => {
        if (req.body.descriptions && req.body.costs) {
            let descriptions = req.body.descriptions;
            let costs = req.body.costs;
            for (let i in descriptions) {
                debt.extras.push({
                    description: descriptions[i],
                    cost: costs[i]
                });
            }
        }
        return debt.save();
    }).then(debt => {
        res.redirect("/debts");
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

// EDIT route
router.get("/debts/:id/edit", function(req, res) {
    debtModel.findById(
        req.params.id
    ).then(debt => {
        res.render("debts/edit", {debt: debt});
    });
});

// UPDATE route
router.put("/debts/:id", function(req, res) {
    debtModel.findByIdAndUpdate(
        req.params.id,
        { $set: {
                title: req.body.title,
                startDate: new Date(req.body.startDate),
                capital: req.body.capital,
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
                    cost: costs[i]
                });
            }
        }
        return debt.save();
    }).then(debt => {
        res.redirect(`/debts/${debt._id}`);
    })
});

// DELETE route
router.delete("/debts/:id", function(req, res) {
    debtModel.findByIdAndRemove(
        req.params.id
    ).then(() => {
        res.redirect("/debts");
    });
});

module.exports = router;
