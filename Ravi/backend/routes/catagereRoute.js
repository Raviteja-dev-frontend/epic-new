import express from "express";
import multer from "multer";
import { addcatagere, listcatagere, removecatagere } from "../controllers/catagereController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("media"), addcatagere);
router.get("/list", listcatagere);
router.post("/remove", removecatagere);

export default router;
