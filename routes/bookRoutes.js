import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addBook, getBooks, getBookDetails, searchBooks } from "../controllers/bookController.js";

const router = express.Router();


router.post("/", authMiddleware, addBook);

router.get("/", getBooks);

router.get("/search", searchBooks);

router.get("/:id", getBookDetails);



export default router;
