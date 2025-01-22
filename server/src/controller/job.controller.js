const NotFoundError = require("../errors/notfound.error");
const JobModel = require("../models/job.model");
const { sendToQueue } = require("../queue/queue");

const { parseCSV } = require("../utils/csvParser");

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
      storeName: store?.storeName || "Unknown",
      areaCode: store?.areaCode || "Unknown",
    };
  });

  const job = new JobModel({ jobId, count, visits: enrichedVisits });
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
  const { jobId } = req.query;
  try {
    const job = await JobModel.findOne({ jobId });
    if (!job) {
      throw new NotFoundError(JobModel, jobId);
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

const getJobs = async (req, res, next) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "Jobs found",
      data: { jobs },
      error: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitJob, getJob, getJobs };
