const { Router } = require("express");
const brandController = require("../controllers/brand");

const brandRouter = new Router();

brandRouter.get("/", brandController.getBrands);
brandRouter.post("/", brandController.createBrand);
brandRouter.put("/:id", brandController.updateBrand);
brandRouter.delete("/:id", brandController.destroyBrand);

module.exports = brandRouter;