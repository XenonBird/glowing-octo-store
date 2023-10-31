const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required.'],
  },
  imageUrl: String,
  description: String,
  price: {
    min: Number,
    max: Number,
    note: String,
  },
  features: {
    display: String,
    processor: String,
    ram: String,
    storage: String,
    camera: String,
    connectivity: String,
  },
});

// Create the Mongoose model
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
