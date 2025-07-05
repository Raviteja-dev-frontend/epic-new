import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      bestseller,
      rating,
      customers,
    } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Extract reviews from req.body
    const reviews = [];
    for (let i = 0; i < 50; i++) {
      const reviewer = req.body[`reviews[${i}][reviewer]`];
      const comment = req.body[`reviews[${i}][comment]`];
      const rating = req.body[`reviews[${i}][rating]`];

      if (reviewer && comment && rating !== undefined) {
        reviews.push({
          reviewer,
          comment,
          rating: Number(rating),
        });
      } else {
        break;
      }
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === "true",
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      image: imagesUrl,
      rating: Number(rating),
      customers: Number(customers),
      reviews,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update reviews
const updateProductReviews = async (req, res) => {
  try {
    const { reviews } = req.body;
    const { id } = req.params;

    if (!Array.isArray(reviews)) {
      return res.json({ success: false, message: "Invalid reviews format" });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { reviews },
      { new: true }
    );

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Reviews updated", product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProductReviews,
};
