const NotFoundError = require("../errors/notfound.error");
const jobModel = require("../models/job.model");

const { parseCSV } = require("../utils/csvParser");
const { sendToQueue } = require("../utils/queue");

let storeData = {};

(async () => {
  storeData = await parseCSV();
})();

const submitJob = async (req, res) => {
  const { count, visits } = req.body;

  if (!count || !visits || count !== visits.length) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid request",
      error: "Invalid request",
      data: {},
    });
  }

  const jobId = Date.now().toString();

  const enrichedVisits = visits.map((visit) => {
    const store = storeData[visit.store_id];
    return {
      ...visit,
      storeName: store?.StoreName || "Unknown",
      areaCode: store?.AreaCode || "Unknown",
    };
  });

  const job = new jobModel({ jobId, count, visits: enrichedVisits });
  await job.save();

  sendToQueue({ jobId, visits: enrichedVisits });

  res.status(201).json({
    status: "success",
    message: "Job submitted",
    data: { jobId },
    error: {},
  });
};

const getJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const job = await jobModel.findOne({ jobId });
    if (!job) {
      throw new NotFoundError(jobModel, jobId);
    }

    res.status(200).json({
      status: "success",
      message: "Job found",
      data: { job },
      error: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitJob, getJob };
