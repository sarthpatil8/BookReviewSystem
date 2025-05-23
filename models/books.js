import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre : String,
  reviews: [{
     userId: mongoose.Schema.Types.ObjectId, 
     review: String ,
     rating: Number
    }],
});

const Book = mongoose.model("Book", BookSchema);
export default Book;
