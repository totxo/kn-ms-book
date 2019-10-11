const express = require('express');
const bookEndpoint = require('./endpoints/book.endpoint');
const {connectMongoDB, addedNBooks} = require('./db/mongo.db');
const {runKafka} = require('./kafka/kafka.connect');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

bookEndpoint(app);

connectMongoDB()
    .then(() => runKafka())
    .then((producer) => {
        app.listen(3001, async () => {
            await producer.connect();
            console.info('kn-ms-book is running on port 3001');
            console.info('Connected with bookdb');
            // addedNBooks(100);
        })
    });
