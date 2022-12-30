const AxiosService = require("./axios-service");
const { getCacheOrTriggerAPI } = require("./cache-service");

class PromotionService extends AxiosService {
  async getProducts() {
    return await getCacheOrTriggerAPI(
      "GET_PRODUCTS",
      this.httpClient.get("products")
    );
  }

  async getProductById(id) {
    return await getCacheOrTriggerAPI(
      `GET_PRODUCTS_${id}`,
      this.httpClient.get(`products/${id}`)
    );
  }
}

module.exports = new PromotionService();
