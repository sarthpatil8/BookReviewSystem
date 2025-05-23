import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addReview, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// Submit a review (one per user per book)
router.post("/:bookId/reviews", authMiddleware, addReview);

// Update own review
router.put("/:id", authMiddleware, updateReview);

// Delete own review
router.delete("/:id", authMiddleware, deleteReview);

export default router;
