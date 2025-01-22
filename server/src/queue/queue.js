const amqp = require("amqplib");

let channel, connection;

const connectQueue = async () => {
  try {
    connection = await amqp.connect({
      hostname: process.env.RABBITMQ_HOST,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      port: parseInt(process.env.RABBITMQ_PORT),
    });
    channel = await connection.createChannel();
    await channel.assertQueue("jobQueue");
    console.log("RabbitMQ connected");
  } catch (err) {
    console.error("RabbitMQ connection error:", err);
    setTimeout(connectQueue, 5000);
  }
};

const sendToQueue = async (message) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue("jobQueue", Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

const consumeQueue = async (callback) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  console.log("Consumer initialized for jobQueue");

  // Start consuming messages
  channel.consume("jobQueue", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log("Message received from jobQueue:", data);

      // Execute the callback with the message data
      callback(data);

      // Acknowledge the message
      channel.ack(msg);
    }
  });
};

module.exports = { connectQueue, sendToQueue, consumeQueue };
