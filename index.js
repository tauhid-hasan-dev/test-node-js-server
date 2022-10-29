const express = require('express');
const app = express();
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

app.get('/', (req, res) => {
    res.send('Test server is running');
})

app.get('/users', (req, res) => {
    res.send(users)
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