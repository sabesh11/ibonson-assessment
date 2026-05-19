const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const errorHandler = require("./middleware/errorMiddleware")

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/purchase", purchaseRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
