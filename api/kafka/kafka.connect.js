const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'kn-ms-book',
    brokers: ['localhost:9092']
});

module.exports = {
    runKafka: () => {
        return new Promise((resolve, reject) => {
            resolve(kafka.producer());
        })
    }
};