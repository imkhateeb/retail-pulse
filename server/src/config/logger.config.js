const winston = require("winston");

const allowedTransports = [];

// This is to ensure that logs are not printed to the console in production
allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf(
        (log) => `${log.timestamp} [${log.level}]: ${log.message}`
      )
    ),
  })
);

// This is to ensure that logs are stored in a file in development
allowedTransports.push(
  new winston.transports.File({
    filename: `app.log`,
  })
);

// The logger object is created with the allowed transports
const logger = winston.createLogger({
  format: winston.format.combine(
    // 1st argument is the format of the timestamp
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    // 2nd argument is the format of the log message
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`
    )
  ),

  transports: allowedTransports,
});

module.exports = logger;
