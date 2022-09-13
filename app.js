const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleWares

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Route is working ! YaY !');
})

module.exports = app;