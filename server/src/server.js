const http = require("http");
const { Server } = require("socket.io");
const connectQueue = require("./src/utils/queue");

const app = require("./app");
const server = http.createServer(app);
const io = new Server(server);

connectQueue();

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = { server, io };
