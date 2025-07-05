import express from "express";
import { submitEnquiry, getAllEnquiries } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", submitEnquiry);       // /api/enquiries
router.get("/", getAllEnquiries);      // for admin list

export default router;
