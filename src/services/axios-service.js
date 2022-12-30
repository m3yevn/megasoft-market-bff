const { default: axios } = require("axios");
const { SUCCESS_CODES } = require("../constants/HTTP_CODES");
const { logger } = require("../logger");
const configService = require("./config-service");

module.exports = class AxiosService {
  constructor() {
    this.httpClient = axios.create({
      baseURL: configService.get("DVS_API_URL"),
    });

    this.httpClient.interceptors.request.use((req) => {
      req.auth = {
        username: configService.get("API_KEY"),
        password: configService.get("API_SECRET"),
      };
      return req;
    });

    this.httpClient.interceptors.response.use(
      (response) => {
        if (!SUCCESS_CODES.includes(response.status)) {
          throw response.data;
        }
        return response;
      },
      (error) => {
        logger.error("Failed in triggering DVS API", error);
        return {
          isError: true,
          ...error.response,
        };
      }
    );
  }
};
