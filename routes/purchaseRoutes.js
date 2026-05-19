const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const {
  getUserPurchase,
  createPurchase,
} = require("../controllers/purchaseController");

const routes = express.Router();

routes.post("/createPurchase", protect, createPurchase);

routes.get("/", protect, getUserPurchase);

module.exports = routes;
