const express = require("express");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  next(new AppError("Requested route not found", 404, "fail"));
});

app.use(errorHandler);

module.exports = app;
