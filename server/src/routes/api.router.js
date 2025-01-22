const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Setup works perfectly!",
    data: {},
    error: {},
  });
});

module.exports = apiRouter;
