const mongoose = require("mongoose");

const purchaseScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    totalprice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Purchase", purchaseScheme);
