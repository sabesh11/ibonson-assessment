const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
};

const getProduct = async (req, res) => {

    const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page-1) * limit;

        const search = req.query.search || "";

        let query = {};

        if(search){
            query.name = {$regex : search,$options:"i"}
        }

  const products = await Product.find(query).sort("-createdAt")
        .skip(skip)
        .limit(limit);

  res.status(200).json({
            currentPage:page,
            totalpages : Math.ceil(products.length / limit),
            totalpurchase:products.length,
            products:products
        });
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  res.status(200).json(products);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  await product.deleteOne();

  res.status(200).json({
    message: "product deleted",
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};
