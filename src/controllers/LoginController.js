const HTTP_CODES = require("../constants/HTTP_CODES");
const { logger } = require("../logger");
const loginService = require("../services/login-service");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const { type } = req.params;
    const [isMatch, token] = await loginService.login(username, password, type);

    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.detail = HTTP_CODES.INVALID_CREDENTIALS;
      logger.error(err.message, err);
      throw err;
    }

    res.json({ isLogin: true, token });
  },

  validateToken: (req, res) => {
    const { token } = req.body;
    const [hasUser] = loginService.validateToken(token);
    res.json({ isValid: hasUser });
  },
};
