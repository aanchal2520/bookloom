const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    story: {
        type: String,
        required: true
    },
    date_published: {
        type: Date,
        required: true,
    }
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;