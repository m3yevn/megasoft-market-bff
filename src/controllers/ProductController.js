const productService = require("../services/product-service");

module.exports = {
  getProducts: async (req, res) => {
    const result = await productService.getProducts();
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
};
