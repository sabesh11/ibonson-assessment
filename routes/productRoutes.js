const express = require("express");

const {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/productController");

const {protect} = require("../middleware/authMiddleware");


const routes = express.Router();

routes.post("/addProduct", protect, createProduct);

routes.get("/", getProduct);

routes.put("/updateProduct", protect, updateProduct);

routes.delete("/deleteProduct", protect, deleteProduct);

module.exports = routes;
