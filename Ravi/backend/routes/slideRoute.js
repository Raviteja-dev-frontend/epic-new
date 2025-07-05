// import express from "express";
// import multer from "multer";
// import { addslide, listslide, removeslide } from "../controllers/slideController.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/add", upload.single("media"), addslide);
// router.get("/list", listslide);
// router.post("/remove", removeslide);

// export default router;
// routes/slideRoutes.js
// routes/slideRoutes.js
// import express from "express";
// import multer from "multer";
// import { addslide, listslide, removeslide } from "../controllers/slideController.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/add", upload.single("media"), addslide);
// router.get("/list", listslide);
// router.post("/remove", removeslide);

// export default router;
import express from "express";
import multer from "multer";
import { addslide, listslide, removeslide } from "../controllers/slideController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // save file temporarily

router.post("/add", upload.single("media"), addslide);
router.get("/list", listslide);
router.post("/remove", removeslide);

export default router;
