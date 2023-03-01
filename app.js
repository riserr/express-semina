const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

//Import Router from /app/api/v1/categories/router.js
const categoriesRouter = require("./app/api/v1/categories/router");

//Import middleware
const handlerErrorMiddleware = require("./app/middlewares/handler-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

//Define Variable
const v1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Starting Page
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to api semina",
  });
});

//Use categoriesRouter
app.use(`${v1}/cms`, categoriesRouter);

//Use Middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
