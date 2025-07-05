import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  rating: { type: Number, default: 4 },
  customers: { type: Number, default: 0 },
  date: { type: Number, required: true },
  reviews: [
    {
      reviewer: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
