const express = require("express");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api.router");
const { PORT } = require("./config/server.config");
const connectToDB = require("./config/db.config");
const NotFoundError = require("./errors/notfound.error");
const app = express();
require("dotenv").config();

// Parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Routes
app.use("/api", apiRouter);

// Random Routes
app.get("*", (req, res, next) => {
  const ipAdd = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    throw new NotFoundError(req.originalUrl, ipAdd);
  } catch (error) {
    next(error);
  }
});

// Registering Global Error Handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDB();
});
