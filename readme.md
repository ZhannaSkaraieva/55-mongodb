1. mkdir mongodb

2. cd mongodb

3. npm init -y

4. npm install express --save

5. npm install mongodb@6.15

6. npm install --save-dev nodemon

7. server.js

8. npm run dev

dotenv module

9. npm install dotenv => ".env"

10. npm install mongoose --save



// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// ); //создаем обект клиента с параметром URL для дальнейшего подсоединения

// async function run() {//создаем асинхрон.функцию для подключения к БД
//     const myDB = client.db("usersbox");
//     const usersArr = [
//         { id: 1, name: "Name1", age: 23 },
//         { id: 2, name: "Name2", age: 24 },
//         { id: 3, name: "Name3", age: 25 },
//         { id: 4, name: "Name4", age: 26 },
//         { id: 5, name: "Name5", age: 27 },
//         { id: 6, name: "Name6", age: 28 },
//         { id: 7, name: "Name7", age: 29 },
//         { id: 8, name: "Name8", age: 30 },
//         { id: 9, name: "Name9", age: 31 }
//     ];
//     try {
//         await client.connect(); //дает команду ждать пока подключение состоиться перед дальнейшим выполением кода 
//         // db.createCollection(name, options) - второй аргумент необязательный
//         console.log(`Connected to Mongo DB`);

//         await myDB.createCollection('UsersCol');//создаем коллекцию с названием в БД к которой ролучили доступ
//         console.log(`Collection created`);
//         const myCollection = myDB.collection('UsersCol');//переносим коллекцию в константу

//         await myCollection.insertMany(usersArr);
//         console.log(`Documents were inserted`);

//         const result = await myCollection.findOne({ id: 5 });//находим документ по id
//         console.log(`Document with id : ${result.id} found`);
//         console.log(result);

//         const filter = { id: 7 };//создаем отбор по значению
//         const newAge =  Math.floor(Math.random() * 10) + 1;;
//         const upUser = await myCollection.updateOne(filter, {  $set: { age: newAge } });//Оператор $setз аменяет значение поля указанным значением.
//         //{ $set: { <field1>: <value1>, ... } }
//         //Если поле не существует, $setдобавит новое поле с указанным значением
//         console.log(upUser);

    
        

//         } catch (err) {
//         console.log(err.stack);
        

    
//     } finally { // этот код будет выполняться не зависимо от результата предыдущего.
//         await client.close(); //закрывает соединение чтобы не нагружать сервер.
//     };
// };
// run().catch(err => console.error("Error:", err));