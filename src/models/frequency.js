const mongoose = require("mongoose");
const Product = require("./product");

const frequencySchema = new mongoose.Schema(
  {
    input_type: { type: String, required: true },
    input_sub_type: { type: String, required: true },
    input_color: { type: String, required: true },
    output_type: { type: String, required: true },
    output_sub_type: { type: String, required: true },
    output_color: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

frequencySchema.methods.findMatch = async (type, subType, color) => {
  const data = await Frequency.find({
    type: type,
    sub_type: subType,
    color: color,
  }).exec();

  data.sort((x, y) => {
    if (x.count < y.count) return 1;
    else if (x.count > y.count) return -1;
    else return 0;
  });

  let ans = [];

  for (let i = 0; i < Math.min(5, data.length); i++) {
    const products = await Product.find({
      type: data[i].output_type,
      sub_type: data[i].output_sub_type,
      color: data[i].output_color,
    }).exec();

    const random1 = Math.floor((Math.random() * products.length) / 3);
    const random2 = random1 + Math.floor((Math.random() * products.length) / 3);
    const random3 = random2 + Math.floor((Math.random() * products.length) / 3);

    ans.push(products[random1]);
    ans.push(products[random2]);
    ans.push(products[random3]);
  }

  return ans;
};

const Frequency = mongoose.model("Frequency", frequencySchema);

module.exports = Frequency;
