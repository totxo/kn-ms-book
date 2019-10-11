const express = require('express');
const mongoose = require('mongoose');

const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'kn-ms-book',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const app = express();

app.use((req, res, next) => {
    req.producer = producer;
    return next()
});

app.put('/book/:userID', async (req, res) => {
    /*
    * When one book is created
    * then -> shoot event
    * one specific user created a book
    */
    await req.producer.send({
        topic: 'issue-creation-of-a-book',
        messages: [
            {
                value: JSON.stringify({
                    _id: "book._id",
                    name: "book.name",
                    createdByUser: "userID"
                })
            },
        ],
    });
    res.status(200).json({status: 'ok'})
});

mongoose.connect('mongodb://localhost:27015/bookdb', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then((res, err) => {
        if (err) return console.error(err);
        console.info('Connected with bookdb')
        app.listen(3001, async () => {
            await producer.connect();
            console.info('kn-ms-book is running on port 3001');
        })
    });