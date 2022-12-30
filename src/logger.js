const { default: Loglestial } = require("@techlestial/loglestial");
const logger = Loglestial.init({ logToFile: true });

const stream = Object.create(process.stdout);
stream.write = logger.info;

module.exports = {
  logger,
  loggerStream: stream,
};
