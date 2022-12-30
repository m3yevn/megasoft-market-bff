const AxiosService = require("./axios-service");
const { getCacheOrTriggerAPI } = require("./cache-service");

class PromotionService extends AxiosService {
  async getPromotions() {
    return await getCacheOrTriggerAPI(
      "GET_PROMOTIONS",
      this.httpClient.get("promotions")
    );
  }

  async getPromotionById(id) {
    return await getCacheOrTriggerAPI(
      `GET_PROMOTIONS_${id}`,
      this.httpClient.get(`promotions/${id}`)
    );
  }
}

module.exports = new PromotionService();
