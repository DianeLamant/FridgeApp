const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
var cors = require('cors')

app.use(express.json());
// app.use(express.static('public'))

// Allows to access the API from react app
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

// IMPORTS ROUTES 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const fridgeRoute = require('./routes/fridge');
const foodRoute = require('./routes/food');

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute);
app.use('/api/fridge', fridgeRoute.router);
app.use('/api/food', foodRoute.router);

// ROUTES
app.get('/', (req, res) => {
    res.send('Fridge App Backend')
})

// DATABASE CONNECTION
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) console.error(err);
        else console.log('Connected to DB');
    })

app.listen(process.env.PORT);