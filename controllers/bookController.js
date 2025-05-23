import Book from "../models/books.js";

// Add book
export const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    if(!title || !author || !genre){
      res.status(404).json({ message: "Title or author or genre missing"});
    }
    
    const book = new Book({ title, author, genre, reviews: [] });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all books 
export const getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const query = {};
    // Searchs for author || genre || author & genre
    if (author) query.author = author;
    if (genre) query.genre = genre;

    const books = await Book.find(query)
      .skip((page - 1) * limit) // Sets the page number 
      .limit(parseInt(limit));  // Sets limit to send response each time 

    res.json({ books, page, limit });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get book details by ID 
export const getBookDetails = async (req, res) => {
  try {
    //First find the book by ID , then populates the reviews for that particular book 
    const book = await Book.findById(req.params.id).populate("reviews.userId", "username");
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Calculates the avg rating 
    const averageRating =
      book.reviews.length > 0
        ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
        : "No ratings yet";

    res.json({ book, averageRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search books 
export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    const books = await Book.find({
      $or: [
        { title: new RegExp(query, "i") }, // "i" for case insensitive  
        { author: new RegExp(query, "i") },
      ],
    });
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
