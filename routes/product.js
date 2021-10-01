const { Router } = require("express");
const productController = require("../controllers/product");

const productRouter = new Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/brands/:brand_id", productController.getBrandProducts);
productRouter.post("/brands/:brand_id", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.destroyProduct);

module.exports = productRouter;