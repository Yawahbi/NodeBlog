const express = require('express');
const sequelize = require('./database');
const IdControl = require('./IdControlMiddleware');
const User = require('./User');

const app = express();

// app.use(async (req, res, next) => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
//     res.send('Done');
// });

sequelize.sync({ force: false }).then(() => console.log('db is ready'));

app.use(express.json());

// Create
app.post('/users', async (req, res) => {
    await User.create(req.body);
    res.send('user inserted');
});

// Find All
app.get('/users', async (req, res) => {
    let page = Number.parseInt(req.query.page);
    let size = Number.parseInt(req.query.size);

    if (Number.isNaN(page)) {
        page = 0;
    }
    if (Number.isNaN(size)) {
        size = 3
    }

    const users = await User.findAndCountAll({
        limit: size,
        offset: page * size
    });
    res.send(users);
});


// Find By ID
app.get('/users/:id', IdControl, async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findOne({ where: { id: id } });
    res.send(user);
});

// Update
app.put('/users/:id', IdControl, async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ where: { id: id } });
    user.username = req.body.username;
    await user.save();
    res.send("user updated");
});

// Delete 
app.delete('/users/:id', IdControl, async (req, res) => {
    const id = req.params.id;

    await User.destroy({ where: { id: id } });
    res.send("user deleted");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(3000, () => console.log('server running on port 3000'));