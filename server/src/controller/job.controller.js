const Job = require("../models/jobModel");
const { parseCSV } = require("../utils/csvParser");
const { sendToQueue } = require("../utils/queue");

let storeData = {};

(async () => {
  storeData = await parseCSV();
})();

const submitJob = async (req, res) => {
  const { count, visits } = req.body;

  if (!count || !visits || count !== visits.length) {
    return res.status(400).json({ error: "Invalid request payload" });
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

  const job = new Job({ jobId, count, visits: enrichedVisits });
  await job.save();

  sendToQueue({ jobId, visits: enrichedVisits });

  res.status(201).json({ job_id: jobId });
};

module.exports = { submitJob };
