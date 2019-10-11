const {runKafka} = require('../kafka/kafka.connect');

module.exports = {
    kafkaProducer: (req, res, next) => {
        runKafka()
            .then((producer) => {
                req.producer = producer;
                return next()
            })
    }
};