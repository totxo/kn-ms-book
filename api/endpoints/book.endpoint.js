const bookCtrl = require('../controllers/book.ctrl');
const producerMiddleare = require('../middlewares/producer.middleware');

module.exports = (app) => {
    app.route('/book/:username')
        .put(producerMiddleare.kafkaProducer, bookCtrl.editBook)
};