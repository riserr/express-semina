//Import dotenv
const dotenv = require("dotenv");

//Get dotenv config
dotenv.config();

//Export urlDb config
module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtSecret: "jwtSecret",
  pwRoot: "Root12345678",
};
