import express from "express";
import { bookSlot, getBookings } from "../controllers/bookingController";

const router = express.Router();

router.post("/", bookSlot);
router.get("/", getBookings);

export default router;
