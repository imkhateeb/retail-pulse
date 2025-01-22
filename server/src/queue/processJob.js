const JobModel = require("../models/job.model");
const axios = require("axios");
const logger = require("../config/logger.config");
const { io } = require("..");

const processJob = async (data) => {
  const { jobId, visits } = data;

  try {
    for (const visit of visits) {
      for (const url of visit.image_url) {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          // const image = await sharp(response.data).metadata();
          console.log(`Processed image for store ${visit.store_id}:`);
        } catch (err) {
          logger(`Error processing image for store ${visit.store_id}:`, err);
          console.error(
            `Error processing image for store ${visit.store_id}:`,
            err
          );
        }
      }
    }

    await JobModel.findOneAndUpdate({ jobId }, { status: "completed" });
    io.emit("jobUpdate", { jobId, status: "completed" });
  } catch (err) {
    console.error(`Error processing job ${jobId}:`, err);
    await JobModel.findOneAndUpdate({ jobId }, { status: "failed" });
    io.emit("jobUpdate", { jobId, status: "failed" });
  }
};

module.exports = processJob;
