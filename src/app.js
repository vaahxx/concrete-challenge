const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// String de conexão com o mongodb
// banco de dados utilizado: reprograma-hemocentros
mongoose.connect('mongodb+srv://admin:admin@reprograma-valentina-4dsq6.mongodb.net/test', (err) => {
  if (err) console.log(err);
});
// representação da conexão com o banco de dados 
let db = mongoose.connection;
// após a conexão, caso ocorra algum erro, este será logado no console
db.on('error', console.log.bind(console, 'connection error:'));
// uma vez que a conexão esteja aberta, uma mensagem de sucesso será exibida
db.once('open', () => {
  console.log('conexão feita com sucesso.');
});

// middlewares
app.use(cors());
app.use(bodyParser.json());

//routes 
const users = require('./routes/usersRoute');
app.use('/usuarios', users);

module.exports = app; 