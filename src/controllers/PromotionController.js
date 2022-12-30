const promotionService = require("../services/promotion-service");

module.exports = {
  getPromotions: async (req, res) => {
    const result = await promotionService.getPromotions();
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
  getPromotionById: async (req, res) => {
    const { id } = req.params;
    const result = await promotionService.getPromotionById(id);
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
};
