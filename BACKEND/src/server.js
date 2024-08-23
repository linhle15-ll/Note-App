// env
require('dotenv').config();

// PORT
const PORT = process.env.PORT || 5001

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');

// create Express App
const app = express();

// Middlewares
app.use(express.json());

// cors configuration
app.use(cors())

// connect to MongoDB
const db = require('../src/db/db')
db();

// Routes
readdirSync(path.join(__dirname, '../src/routes')).map((route) => {
    app.use('/api', require(path.join(__dirname, '../src/routes', route)));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
})

// create http module": ""
var http = require('http'); 

// create server instance
const server = http.createServer(app);

// listen to PORT
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})

