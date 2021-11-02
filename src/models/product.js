const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    type: String,
    sub_type: String,
    color: String,
    is_tagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.pre("save", async (next) => {
  const product = this;
  const { type, subType, color } = await getTags(product.image_url);
  if (type && subType && color) {
    product.type = type;
    product.sub_type = subType;
    product.color = color;
    product.is_tagged = true;
  }
  next();
});

productSchema.statics.findByAttributes(
  async (type, subType, color) =>
    await Product.find({ type: type, sub_type: subType, color: color })
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
