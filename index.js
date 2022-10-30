const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000

const users = [
    { id: 1, name: 'Tauhid Hasan', email: 'tauhidhasan11@gmail.com' },
    { id: 2, name: 'Tahmid Hasan', email: 'tahmidhasan11@gmail.com' },
    { id: 3, name: 'Tahsan Hasan', email: 'tahsanhasan11@gmail.com' },
    { id: 4, name: 'Tazdid Hasan', email: 'tazdidhasan11@gmail.com' },
]

//username: dbUser2
//password : WAP4KDVKgS3EhEYT


const uri = "mongodb+srv://dbUser2:WAP4KDVKgS3EhEYT@cluster0.jjvuikj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("testserver").collection("users");
    // perform actions on the collection object
    console.log('database connected');
    client.close();
});


app.get('/', (req, res) => {
    res.send('Test server is running');
})

app.get('/users', (req, res) => {
    console.log(req.query)
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered);
    } else {
        res.send(users)
    }
})

app.post('/users', (req, res) => {
    console.log('api hitted');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
    console.log(user);
})

app.listen(port, () => {
    console.log(`This app is running on port${port}`)
})