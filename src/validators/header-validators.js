const HTTP_CODES = require("../constants/HTTP_CODES");
const loginService = require("../services/login-service");

const respondUnauthorized = (res) => {
  const { status, code, message } = HTTP_CODES.UNAUTHORIZED;
  res.status(status).json({
    code,
    message,
  });
};

module.exports = {
  TokenValidator: (req, res, next) => {
    const { authorization } = JSON.parse(JSON.stringify(req.headers));
    if (!authorization) {
      return respondUnauthorized(res);
    }

    const token = authorization.split("Bearer ")?.[1];
    const [hasUser, { username, type }] = loginService.validateToken(token);

    if (!hasUser) {
      return respondUnauthorized(res);
    }

    req.username = username;
    req.type = type;
    next();
  },
  AdminValidator: (req, res, next) => {
    if (req.type !== "admin") {
      return respondUnauthorized(res);
    }
    next();
  },
};
