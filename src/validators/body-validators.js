const HTTP_CODES = require("../constants/HTTP_CODES");
const { logger } = require("../logger");

module.exports = {
  LoginValidator: (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      const validator = {};
      validator[!req.body.username ? "username" : null] = "Username is empty";
      validator[!req.body.password ? "password" : null] = "Password is empty";

      logger.error(HTTP_CODES.BAD_REQUEST, validator);
      return res.status(400).json({
        code: HTTP_CODES.BAD_REQUEST,
        validator,
      });
    }
    return next();
  },
};
