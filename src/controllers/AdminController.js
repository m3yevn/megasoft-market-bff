const adminService = require("../services/admin-service");

module.exports = {
  getBalances: async (req, res) => {
    const result = await adminService.getBalances();
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
  getTransactions: async (req, res) => {
    const result = await adminService.getTxnList();
    if (result.isError) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  },
};
