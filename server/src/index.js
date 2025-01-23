const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api.router");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");
const NotFoundError = require("./errors/notfound.error");
const { PORT } = require("./config/server.config");
const { connectQueue, consumeQueue } = require("./queue/queue");
const processJob = require("./queue/processJob");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
require("dotenv").config();

// Express App
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow cookies if needed
  },
});

// Rate Limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    status: "failure",
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    data: {},
    error: {
      msg: "Too many requests from this IP, please try again after 15 minutes",
    },
  },
});

// Parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Or enable CORS for specific origins
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);

// Routes
app.use("/api", limiter, apiRouter);

// Random Routes
app.get("*", (req, res, next) => {
  const ipAdd = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    throw new NotFoundError(req.originalUrl, ipAdd);
  } catch (error) {
    next(error);
  }
});

// Registering Global Error Handler
app.use(errorHandler);

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Start Server
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Initializing database
  await connectToDB();

  // Initializing RabbitMQ
  await connectQueue();

  consumeQueue(async (data) => {
    console.log("JOB RECEIVED:", data);
    await processJob(data, io);
  });
});
