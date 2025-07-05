import { manageCategory as Category } from '../models/manageCategory.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const newCategory = new Category({ name: name.trim() });
    await newCategory.save();

    res.json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
