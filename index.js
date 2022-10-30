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

const run = async () => {
    try {
        const userCollection = client.db('testnode').collection('users')
        /*  const user = { name: 'kulsum', email: 'kulsum@gmail.com' } */
        /* const result = await userCollection.insertOne(user);
        console.log(result) */

        app.post('/users', async (req, res) => {
            console.log('api hitted');
            //this is the user coming from the user request
            const user = req.body;
            //result variable inserting a user into userCollection(mongodb)
            const result = await userCollection.insertOne(user);
            console.log(result)
            //we setting the id of the new user from the result id
            user.id = result.insertedId;
            /*after store data in database.if we want to send this data to the ui we need to
            this data with res.send(user) to be updated in the ui
            */
            res.send(user);
        })
    }
    finally {

    }
}

run().catch(e => console.log(e))


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

/* app.post('/users', (req, res) => {
    console.log('api hitted');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
    console.log(user);
}) */

app.listen(port, () => {
    console.log(`This app is running on port${port}`)
})