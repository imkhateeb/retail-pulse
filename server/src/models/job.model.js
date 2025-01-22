const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["ongoing", "completed", "failed"],
      default: "ongoing",
    },
    count: { type: Number, required: true },
    visits: [
      {
        store_id: { type: String, required: true },
        storeName: { type: String, required: true },
        areaCode: { type: String, required: true },
        image_url: { type: [String], required: true },
        visit_time: { type: Date, required: true },
      },
    ],
    errors: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
