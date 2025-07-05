import express from 'express';
import { manageCategory } from '../models/manageCategory.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await manageCategory.find();
    res.json({ success: true, categories });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Add a new category
router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await manageCategory.findOne({ name });
    if (existing) {
      return res.json({ success: false, message: "Category already exists" });
    }
    const newCategory = new manageCategory({ name });
    await newCategory.save();
    res.json({ success: true, message: "Category added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Delete a category by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    await manageCategory.findByIdAndDelete(categoryId);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
