const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api.router");
const errorHandler = require("./utils/errorHandler");
const { connectQueue } = require("./utils/queue");
const connectToDB = require("./config/db.config");
const NotFoundError = require("./errors/notfound.error");
const { PORT } = require("./config/server.config");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Initialize RabbitMQ
connectQueue();

// Parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Routes
app.use("/api", apiRouter);

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
  await connectToDB();
});
