const txnService = require("../services/txn-service");

module.exports = {
  submitTxn: async (req, res) => {
    const { productId, creditTo } = req.body;
    const result = await txnService.submitTxn(
      req.username,
      productId,
      creditTo
    );
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
};
