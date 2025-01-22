const JobModel = require("../models/job.model");
const axios = require("axios");
const logger = require("../config/logger.config");
const { io } = require("..");

// Helper function to introduce a random delay
const randomDelay = async () => {
  const delay = Math.random() * (400 - 100) + 100; // Random delay between 100ms (0.1s) and 400ms (0.4s)
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const processJob = async (data) => {
  const { jobId, visits } = data;

  try {
    for (const visit of visits) {
      for (const url of visit.image_url) {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          // Processing of image
          // const image = await sharp(response.data).metadata();
          console.log(`Processed image for store ${visit.store_id}:`);
          await randomDelay(); // Wait for a random delay
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
    // io.emit("jobUpdate", { jobId, status: "completed" });
  } catch (err) {
    console.error(`Error processing job ${jobId}:`, err);
    await JobModel.findOneAndUpdate({ jobId }, { status: "failed" });
    // io.emit("jobUpdate", { jobId, status: "failed" });
  }
};

module.exports = processJob;
