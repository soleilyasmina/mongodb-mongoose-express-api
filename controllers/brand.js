const Brand = require("../models/brand");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    Brand.findByIdAndUpdate(id, req.body, { new: true }, (err, brand) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!brand) {
        return res.status(404).json({ error: "Brand not found!" });
      }
      return res.json(brand);
    })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const destroyBrand = async (req, res) => {
  try {
    const { id } = req.params;
    Brand.findByIdAndDelete(id, (err, brand) => {
      // if any validation errors happen
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // if the brand with the id in question does not exist
      if (!brand) {
        return res.status(404).json({ error: "Brand not found!" });
      }
      // success!
      res.json(brand);
    })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  destroyBrand,
}