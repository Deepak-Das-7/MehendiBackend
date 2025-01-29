import express from "express";
import { submitQuery, getQueries } from "../controllers/contactController";

const router = express.Router();

router.post("/", submitQuery);
router.get("/", getQueries);

export default router;
