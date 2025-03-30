const express = require('express')
const app = express()
const PORT = 3000
const { MongoClient } = require("mongodb");
//импортируем MongoClient из mongodb

app.use(express.json()); //Этот middleware позволяет Express автоматически разбирать JSON-данные из POST, PUT, PATCH запросов.

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Zhanna:Pass123@cluster0.z9uldgm.mongodb.net/usersbox?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect(uri); //подключилась к DB
        console.log("Connected to Mongo DB");
    } finally {
        await client.close();
    };
};
run().catch(console.dir);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`App listening on port ${PORT}`)
})