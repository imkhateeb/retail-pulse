const JobModel = require("../models/job.model");
const axios = require("axios");
const logger = require("../config/logger.config");

// Helper function to introduce a random delay
const randomDelay = async () => {
  const delay = Math.random() * (400 - 100) + 100; // Random delay between 100ms (0.1s) and 400ms (0.4s)
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const processJob = async (data, io) => {
  const { jobId, visits } = data;

  try {
    for (const visit of visits) {
      for (const url of visit.image_url) {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });

          // Simulate image processing
          console.log(`Processed image for store ${visit.store_id}: ${url}`);
          await randomDelay(); // Wait for a random delay

          // Emit real-time update to the client
          io.emit("imageProcessed", {
            jobId,
            storeId: visit.store_id,
            imageUrl: url,
            status: "processed",
          });
        } catch (err) {
          logger.error(
            `Error processing image for store ${visit.store_id}:`,
            err
          );
          io.emit("imageProcessed", {
            jobId,
            storeId: visit.store_id,
            imageUrl: url,
            status: "failed",
          });
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
