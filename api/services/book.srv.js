const bookRepository = require('../repositories/book.repository');

module.exports = {
    editBook: (book, req, res) => {
        return new Promise((resolve, reject) => {
            bookRepository.editBook(book)
                .then(async (message) => {
                    if (message.nModified > 0) {
                        await req.producer.send({
                            topic: 'issue-creation-of-a-book',
                            messages: [
                                {
                                    value: JSON.stringify({
                                        _id: book._id,
                                        name_book: book.name_book,
                                        editedBy: book.editedBy
                                    })
                                },
                            ],
                        });
                        message = `El libro '${book.name_book}' fue editado por '${book.editedBy}'`
                    } else {
                        message = `Nada nuevo ocurrio :/`
                    }
                    resolve(message)
                })
                .catch((err) => reject(err))
        })
    }
};