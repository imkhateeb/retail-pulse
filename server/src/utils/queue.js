const amqp = require("amqplib");

let channel, connection;

const connectQueue = async () => {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("jobQueue");
    console.log("RabbitMQ connected");
  } catch (err) {
    console.error("RabbitMQ connection error:", err);
  }
};

const sendToQueue = async (message) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue("jobQueue", Buffer.from(JSON.stringify(message)));
};

const consumeQueue = async (callback) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.consume("jobQueue", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      callback(data);
      channel.ack(msg);
    }
  });
};

module.exports = { connectQueue, sendToQueue, consumeQueue };
