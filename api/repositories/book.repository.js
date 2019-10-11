const Book = require('../models/book.model');

module.exports = {
    editBook: (book) => {
        return new Promise((resolve, reject) => {
            Book.updateOne({name_book: book.name_book}, {$set: {editedBy: book.editedBy}}, (err, message) => {
                if (err) return reject(err);
                resolve(message)
            })
        })
    }
};