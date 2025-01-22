const { consumeQueue } = require("../utils/queue");
const Job = require("../models/jobModel");
const axios = require("axios");
const sharp = require("sharp");
const { io } = require("../server");

consumeQueue(async (data) => {
  const { jobId, visits } = data;

  try {
    for (const visit of visits) {
      for (const url of visit.image_url) {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const image = await sharp(response.data).metadata();
          console.log(`Processed image for store ${visit.store_id}:`, image);
        } catch (err) {
          console.error(
            `Error processing image for store ${visit.store_id}:`,
            err
          );
        }
      }
    }

    await Job.findOneAndUpdate({ jobId }, { status: "completed" });
    io.emit("jobUpdate", { jobId, status: "completed" });
  } catch (err) {
    console.error(`Error processing job ${jobId}:`, err);
    await Job.findOneAndUpdate({ jobId }, { status: "failed" });
    io.emit("jobUpdate", { jobId, status: "failed" });
  }
});
