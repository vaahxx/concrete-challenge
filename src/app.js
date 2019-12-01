const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// String de conexão com o mongodb
// banco de dados utilizado: reprograma-valentina
db.connect();

// middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
const users = require('./routes/usersRoute');

app.use('/usuarios', users);

module.exports = app;
