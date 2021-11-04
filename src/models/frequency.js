const mongoose = require("mongoose");
const Product = require("./product");

const frequencySchema = new mongoose.Schema(
  {
    type_1: { type: String, required: true },
    sub_type_1: { type: String, required: true },
    color_1: { type: String, required: true },
    type_2: { type: String, required: true },
    sub_type_2: { type: String, required: true },
    color_2: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

frequencySchema.statics.findMatch = async (type, subType, color) => {
  let ans = [];

  const data_1 = await Frequency.find({
    type_1: type,
    sub_type_1: subType,
    color_1: color,
  }).exec();

  console.log(data_1);

  data_1.sort((x, y) => {
    if (x.count < y.count) return 1;
    else if (x.count > y.count) return -1;
    else return 0;
  });

  for (let i = 0; i < Math.min(5, data_1.length); i++) {
    const products = await Product.find({
      type: data_1[i].type_2,
      sub_type: data_1[i].sub_type_2,
      color: data_1[i].color_2,
    }).exec();

    const random1 = Math.floor((Math.random() * products.length) / 3);
    const random2 = random1 + Math.floor((Math.random() * products.length) / 3);
    const random3 = random2 + Math.floor((Math.random() * products.length) / 3);

    ans.push(products[random1]);
    ans.push(products[random2]);
    ans.push(products[random3]);
  }

  const data_2 = await Frequency.find({
    type_2: type,
    sub_type_2: subType,
    color_2: color,
  }).exec();

  data_2.sort((x, y) => {
    if (x.count < y.count) return 1;
    else if (x.count > y.count) return -1;
    else return 0;
  });

  for (let i = 0; i < Math.min(5, data_2.length); i++) {
    const products = await Product.find({
      type: data_2[i].type_1,
      sub_type: data_2[i].sub_type_1,
      color: data_2[i].color_1,
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
