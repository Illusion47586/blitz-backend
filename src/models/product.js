const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    type: String,
    sub_type: String,
    color: String,
  },
  { timestamps: true }
);

productSchema.pre("save", async (next) => {
  next();
});

module.exports = mongoose.model("Product", productSchema);
