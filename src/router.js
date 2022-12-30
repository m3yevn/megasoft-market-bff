const { Router } = require("express");
const AdminController = require("./controllers/AdminController");
const { HealthController } = require("./controllers/HealthController");
const LoginController = require("./controllers/LoginController");
const ProductController = require("./controllers/ProductController");
const PromotionController = require("./controllers/PromotionController");
const TxnController = require("./controllers/TxnController");
const { LoginValidator } = require("./validators/body-validators");
const {
  TokenValidator,
  AdminValidator,
} = require("./validators/header-validators");

const v1Router = Router();

v1Router.get("/health", HealthController);
v1Router.post("/login", LoginValidator, LoginController.login);
v1Router.post("/token", LoginController.validateToken);
v1Router.get("/promotions", TokenValidator, PromotionController.getPromotions);
v1Router.get(
  "/promotions/:id",
  TokenValidator,
  PromotionController.getPromotionById
);
v1Router.get("/products", TokenValidator, ProductController.getProducts);
v1Router.get("/products/:id", TokenValidator, ProductController.getProductById);
v1Router.post("/transactions", TokenValidator, TxnController.submitTxn);

v1Router.get(
  "/transactions",
  TokenValidator,
  AdminValidator,
  AdminController.getTransactions
);

v1Router.get(
  "/balances",
  TokenValidator,
  AdminValidator,
  AdminController.getBalances
);

module.exports = { v1Router };
