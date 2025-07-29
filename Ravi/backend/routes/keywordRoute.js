import express from 'express';
import {
  generateKeyword,
  getAllKeywords,
  deleteKeyword,
  getKeywordBySlug
} from '../controllers/keywordController.js';
import adminAuth from '../middleware/adminAuth.js'; 
const router = express.Router();

router.post('/generate', adminAuth, generateKeyword);
router.get('/', adminAuth, getAllKeywords);
router.delete('/:id',adminAuth, deleteKeyword);
router.get("/:slug",adminAuth, getKeywordBySlug);

export default router;
