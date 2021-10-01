const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'brands' }
  },
  { timestamps: true },
);

module.exports = model("Product", productSchema);