import express from "express";
import multer from "multer"; // 👈 1. Impor multer
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteArtikelById, getArtikel, saveArtikel, showArtikelById, updateArtikelById } from "../controlllers/artikelController.js";

const router = express.Router();

// 👈 2. Konfigurasi Multer dengan Memory Storage (Wajib untuk Vercel Serverless)
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getArtikel);

// 👈 3. Pasang upload.single("foto") setelah authenticate pada method POST
router.post("/", authenticate, upload.single("foto"), saveArtikel);

router.get("/:id", showArtikelById);

// 👈 4. Pasang upload.single("foto") setelah authenticate pada method PUT
router.put("/:id", authenticate, upload.single("foto"), updateArtikelById);

router.delete("/:id", authenticate, deleteArtikelById);

export default router;