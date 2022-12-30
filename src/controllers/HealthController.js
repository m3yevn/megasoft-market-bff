const HTTP_CODES = require("../constants/HTTP_CODES");

module.exports = {
  HealthController: (req, res) => {
    res.json({
      code: HTTP_CODES.HEALTHY_AND_ALIVE,
      message: "Alive and kicking!",
    });
  },
};
