const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const getBrandProducts = async (req, res) => {
  try {
    const { brand_id } = req.params;
    const brandProducts = await Product.find({ brand: brand_id });
    res.json(brandProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const createProduct = async (req, res) => {
  try {
    const { brand_id } = req.params;
    const product = new Product({ ...req.body, brand: brand_id });
    await product.save();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    Product.findByIdAndUpdate(id, req.body, { new: true }, (err, product) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!product) {
        return res.status(404).json({ error: "Product not found!" });
      }
      return res.json(product);
    })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const destroyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id, (err, product) => {
      // if any validation errors happen
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // if the product with the id in question does not exist
      if (!product) {
        return res.status(404).json({ error: "Product not found!" });
      }
      // success!
      res.json(product);
    })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getProducts,
  getBrandProducts,
  createProduct,
  updateProduct,
  destroyProduct,
}
