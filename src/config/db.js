const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.connect(
      'mongodb+srv://admin:admin@reprograma-valentina-4dsq6.mongodb.net/test',
      err => {
        if (err) console.log(err);
      },
    );

    const { connection } = mongoose;

    connection.on('error', console.log.bind(console, 'connection error:'));
    // uma vez que a conexão esteja aberta, uma mensagem de sucesso será exibida
    connection.once('open', () => {
      console.log('conexão feita com sucesso.');
    });
  },
};
