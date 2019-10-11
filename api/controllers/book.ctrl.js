const Book = require('../models/book.model');
const bookSrv = require('../services/book.srv');

module.exports = {
    editBook: async (req, res) => {

        const book = new Book({
            name_book: req.body.name_book,
            editedBy: req.params.username
        });

        bookSrv.editBook(book, req, res)
            .then((message) => res.status(200).json(message));
    }
};