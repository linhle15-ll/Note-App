// env
require('dotenv').config
// PORT
const PORT = process.env.PORT || 5001

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');


// create Express App
const app = express();

// create server instance
const server = http.createServer(app)

// Middlewares
app.use(express.json());

// cors configuration
app.use(cors())

// connect to MongoDB
const db = require("./db/db")
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

// listen to PORT
server.listen(PORT, `Server is listening on port ${PORT}.`)


