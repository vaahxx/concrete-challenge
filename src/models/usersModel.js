const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de usuários
// instancia um novo schema, que representa o objeto usuário - utilizado no model
const userSchema = new Schema({
    nome: {type: String, required: true},
    email: {type: String},
    senha: {type: String},
    telefones: [{
        numero: {type: Number}, ddd: {type: Number}
    }],
}, 
{
    versionKey: false
});

// cria o model de usuários
// este método recebe como parametros uma string com o nome do model e um objeto Schema
const Usuarios = new mongoose.model('Usuarios', userSchema);

module.exports = Usuarios;