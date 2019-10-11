const mongoose = require('mongoose');
const Book = require('../models/book.model');
var casual = require('casual');

module.exports = {
    connectMongoDB: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://localhost:27015/bookdb', {
                useNewUrlParser: true, useUnifiedTopology: true
            })
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                });
        })
    },

    addedNBooks: (n) => {
        for (let i = 0; i < n; i++) {
            let book = new Book({
                name_book: casual.title,
                editedBy: casual.name
            });
            book.save();
        }
        console.info(`Se crearon ${n} libros`);

    }
};
