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

frequencySchema.pre("save", async (next) => {
  const freq = this;

  const prev_freq = await Frequency.findOne({
    input_type: freq.input_type,
    input_sub_type: freq.input_sub_type,
    input_color: freq.input_color,
    output_type: freq.output_type,
    output_sub_type: freq.output_sub_type,
    output_color: freq.output_color,
  });

  if (prev_freq) {
    prev_freq.count++;
    prev_freq.save();
  } else next();
});

frequencySchema.statics.findMatch = async (type, subType, color) => {
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
