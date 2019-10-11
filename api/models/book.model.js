const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name_book: {
        type: String,
        required: [true, 'Book name is required']
    },
    editedBy: {
        type: String,
        required: [true, 'editedBy is required']
    }
});

module.exports = mongoose.model('Book', bookSchema);