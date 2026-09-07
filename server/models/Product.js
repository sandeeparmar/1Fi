const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const emiPlanSchema = new mongoose.Schema({
  months: Number,
  monthly: Number,
  label: String
});

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  description: String,
  image: String,
  startingPrice: Number,
  variants: [variantSchema],
  emiPlans: [emiPlanSchema]
});

module.exports = mongoose.model('Product', productSchema);
