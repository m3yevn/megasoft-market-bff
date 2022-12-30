const dotenv = require("dotenv");

class ConfigService {
  constructor() {
    dotenv.config();
  }

  get(variable) {
    return process.env[variable];
  }
}

module.exports = new ConfigService();
