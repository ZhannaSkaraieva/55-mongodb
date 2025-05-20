const express = require('express')
const app = express()
require('dotenv').config(); // загрузка переменных окружения из .env файла
//const { MongoClient, ServerApiVersion } = require("mongodb");
//деструктурирующее присваивание и импортирует MongoClient из библиотеки mongodb.
//const mongodb = require("mongodb");
//const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

app.use(express.json()); 

// Replace the uri string with your connection string. 
// Адрес базы данных
const uri = "mongodb+srv://Zhanna:Pass123@cluster0.z9uldgm.mongodb.net/usersbox?retryWrites=true&w=majority&appName=Cluster0";

//Определяем схему для пользователя
const userSchema = new mongoose.Schema({ 
        id: Number,
        name: String,
        age: Number,      
}); 
 
//Создание модели
const User = mongoose.model('User', userSchema);

main().catch(err => console.log(err));
async function main() {
    try {
        await mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
        console.log(`Connect to MongpDB`);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};



app.get('/', async (req, res) => {
    console.log('Checking document count...');
    try {
        const count = await User.countDocuments({}); // проверяем количество документов в коллекции
        console.log(`Document count:`, count); // Печать количества документов
        if (count !== 0) {
            const users = await User.find({});
            res.json(users);
        } else {
            console.error(`Error, not found`,err);
        }
    } catch {
        console.log();
    } 
});


app.post('/', async (req, res) => {
    const usersArr = [
        { "id": 1, "name": "Name1", "age": 23 },
        { "id": 2, "name": "Name2", "age": 24 },
        { "id": 3, "name": "Name3", "age": 25 },
        { "id": 4, "name": "Name4", "age": 26 },
        { "id": 5, "name": "Name5", "age": 27 },
        { "id": 6, "name": "Name6", "age": 28 },
        { "id": 7, "name": "Name7", "age": 29 },
        { "id": 8, "name": "Name8", "age": 30 },
        { "id": 9, "name": "Name9", "age": 31 }
    ];
    try {
        const count = await User.countDocuments({}); // проверяем количество документов в коллекции
        console.log(`Document count:`, count); // Печать количества документов
        if (count === 0) {
            console.log('Database is empty. Inserting users...');
            // Если база пуста, вставляем новый массив пользователей
            await User.insertMany(usersArr); // Вставляем все данные
            console.log('Users added successfully.');
            return res.status(201).send('Users added successfully');
        } else {
            console.log(`DB full`);
            const users = await User.find({});
            res.json(users);
            console.log(users);
        }
    } catch (err){
        console.log(err);
    }
});

//{ "id": 10, "name": "New", "age": 35 }
app.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User inserted', newUser });
    } catch (err) {
        res.status(500).json({ error: 'Insert failed', details: err });
    }
});

//{ "name": "....." }
app.patch('/user/:id', async (req, res) => {
    try {
        const result = await User.updateOne({ id: parseInt(req.params.id) }, { $set: req.body });
        res.json({ message: 'User updated', result });
    } catch (err) {
        res.status(500).json({ error: 'Update failed', details: err });
    }
});

//{ "id": 10, "name": ".....", "age": 50 }
app.put('/:id', async (req, res) => {
    try {
        const result = await User.replaceOne({ id: parseInt(req.params.id) }, req.body);
        res.json({ message: 'User replaced', result });
    } catch (err) {
        res.status(500).json({ error: 'Replace failed', details: err });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const result = await User.deleteOne({ id: parseInt(req.params.id) });
        res.json({ message: 'User deleted', result });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed', details: err });
    }
});

app.listen(process.env.DB_PORT, (error) => {
            error ? console.log(error) : console.log(`App listening on http://localhost:${process.env.DB_PORT}/`)
        });