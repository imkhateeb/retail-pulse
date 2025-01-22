const express = require("express");
const { submitJob, getJob } = require("../controller/job.controller");

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Setup works perfectly!",
    data: {},
    error: {},
  });
});

apiRouter.post("/submit", submitJob);
apiRouter.get("/status", getJob);

module.exports = apiRouter;
