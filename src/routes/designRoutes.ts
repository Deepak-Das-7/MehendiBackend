import express from "express";
import { addDesign, getDesigns } from "../controllers/designController";

const router = express.Router();

router.post("/", addDesign);
router.get("/", getDesigns);
// router.get("/:id", getDesignById);

export default router;