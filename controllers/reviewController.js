import Book from "../models/books.js";

// Ad a new review 
export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { review, rating } = req.body;
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: "Book not found" });

    // one per user only 
    const existingReview = book.reviews.find(r => r.userId.toString() === req.user.id);
    // req.user.id is fetched from request (header)
    if (existingReview) return res.status(400).json({ message: "You have already reviewed this book" });

    book.reviews.push({ userId: req.user.id, review, rating });// Push adds elements to the array 
    await book.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Review 
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating } = req.body;
    
    // Searches for the Book using the review id 
    const book = await Book.findOne({ "reviews._id": id });
    if (!book) return res.status(404).json({ message: "Review not found" });
    
    //Checks if the current user eligible to update the review or not 
    const reviewIndex = book.reviews.findIndex(r => r._id.toString() === id && r.userId.toString() === req.user.id);
    if (reviewIndex === -1) return res.status(403).json({ message: "Unauthorized to edit this review" });

    book.reviews[reviewIndex].review = review; 
    book.reviews[reviewIndex].rating = rating;
    await book.save();

    res.json({ message: "Review updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete 
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ "reviews._id": id });
    if (!book) return res.status(404).json({ message: "Review not found" });

      //Checks if the current user eligible to delete the review or not 
    const reviewIndex = book.reviews.findIndex(r => r._id.toString() === id && r.userId.toString() === req.user.id);
    if (reviewIndex === -1) return res.status(403).json({ message: "Unauthorized to delete this review" });

    book.reviews.splice(reviewIndex, 1); // Splice deletes the item at the particular given index 
    await book.save();

    res.json({ message: "Review deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
