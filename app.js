const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

//Import Router from /app/api/v1/categories/router.js
const categoriesRouter = require("./app/api/v1/categories/router");

const imagesRouter = require("./app/api/v1/images/router");

const talentsRouter = require("./app/api/v1/talents/router");

//Import middleware
const {
  HandlerErrorMiddleware,
  NotFoundMiddleware,
} = require("./app/middlewares");

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
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);

//Use Middleware
app.use(NotFoundMiddleware);
app.use(HandlerErrorMiddleware);

module.exports = app;
