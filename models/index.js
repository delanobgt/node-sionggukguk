'use strict';

const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

module.exports.debt = require("./debt");
module.exports.user = require("./user");
