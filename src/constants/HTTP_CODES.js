module.exports = {
  HEALTHY_AND_ALIVE: "ALIVE_001",
  SERVER_ERROR: "SERVER_ERROR_500",
  NOT_FOUND: "NOT_FOUND_404",
  BAD_REQUEST: "BAD_REQUEST_400",
  INVALID_CREDENTIALS: {
    status: 401,
    code: "INVALID_CREDENTIALS_401",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED_401",
    message: "Request is unauthorized",
  },
  SUCCESS_CODES: [200, 201],
};
