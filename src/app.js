const express = require("express");
const cors = require("cors");
const { v1Router } = require("./router");
const HTTP_CODES = require("./constants/HTTP_CODES");
const bodyParser = require("body-parser");
const configService = require("./services/config-service");
const morgan = require("morgan");
const { loggerStream, logger } = require("./logger");

const app = express();
const port = configService.get("PORT");

app.listen(port, () => {
  logger.log(`App is listening on ${port}.`);
});

app.use(morgan("combined", { stream: loggerStream }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", v1Router);

app.use("*", (req, res) => {
  const NOT_FOUND_ERROR = {
    code: HTTP_CODES.NOT_FOUND,
    message: "404 Not found",
  };

  logger.error(NOT_FOUND_ERROR.message, NOT_FOUND_ERROR);
  res.status(404).json(NOT_FOUND_ERROR);
});

app.use((err, _, res, __) => {
  logger.error(err.message, err);
  const error = err.detail;

  res.status(error?.status || 500).json({
    code: error?.code ?? HTTP_CODES.SERVER_ERROR,
    message: err.message,
  });
});
