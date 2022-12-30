const AxiosService = require("./axios-service");
const ShortUniqueId = require("short-unique-id");
const DVS_CODES = require("../constants/DVS_CODES");
const FIELDS = require("../constants/FIELDS");
const { logger } = require("../logger");
const uid = new ShortUniqueId({ length: 10 });

class TxnService extends AxiosService {
  async submitTxn(username, productId, creditTo) {
    const transaction = this.#constructTxn(username, productId, creditTo);
    const result = await this.httpClient.post(
      "async/transactions",
      transaction
    );

    if (result.status === 400) {
      const errors = this.#constructBadRequestError(
        result.data.errors,
        Object.keys(creditTo)[0]
      );

      return {
        ...result,
        data: {
          ...result.data,
          errors,
        },
      };
    }

    return result;
  }

  #constructBadRequestError(errors, creditId) {
    return errors.map((error) => {
      if (error.code === DVS_CODES.CREDIT_ID_INVALID) {
        return {
          ...error,
          message: `${FIELDS[creditId]} is invalid.`,
        };
      }
      return error;
    });
  }

  #constructTxn(username, productId, creditTo) {
    return {
      external_id: `${username}.${uid()}`,
      product_id: productId,
      auto_confirm: true,
      credit_party_identifier: creditTo,
    };
  }
}

module.exports = new TxnService();
