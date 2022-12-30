const AxiosService = require("./axios-service");
const { getCacheOrTriggerAPI } = require("./cache-service");

class AdminService extends AxiosService {
  async getBalances() {
    return await getCacheOrTriggerAPI(
      "GET_BALANCES",
      this.httpClient.get("balances")
    );
  }

  async getTxnList() {
    return await getCacheOrTriggerAPI(
      "GET_TRANSACTIONS",
      this.httpClient.get("transactions")
    );
  }
}

module.exports = new AdminService();
