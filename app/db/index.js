// (1) import package mongoose
const mongoose = require("mongoose");

// (2) import urlDb config for MongoDB from app/config.js 
const { urlDb } = require("../config");

// (3) connect to MongoDB
mongoose.connect(urlDb);

// (4) save connection into variable
const db = mongoose.connection;

// (5) export db
module.exports = db;
