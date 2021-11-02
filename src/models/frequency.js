const mongoose = require("mongoose");

const frequencySchema = new mongoose.Schema(
  {
    input_type: { type: String, required: true },
    input_sub_type: { type: String, required: true },
    input_color: { type: String, required: true },
    output_type: { type: String, required: true },
    output_sub_type: { type: String, required: true },
    output_color: { type: String, required: true },
  },
  { timestamps: true }
);

frequencySchema.statics.findLatestData = async (type, subType, color) => {
  const data = await Frequency.find({});
};

const Frequency = mongoose.model("Frequency", frequencySchema);

module.exports = Frequency;
