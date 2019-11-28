const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de usuários
// instancia um novo schema, que representa o objeto usuário - utilizado no model
const userSchema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, lowercase: true},
    senha: {type: String},
    telefones: [{
        _id: false,
        numero: {type: Number}, 
        ddd: {type: Number}
    }],
    data_criacao: {type: Date, default: Date.now},
    //data_atualizacao,
    //ultimo_login,
}, 
{
    versionKey: false
});

// cria o model de usuários
// este método recebe como parametros uma string com o nome do model e um objeto Schema
const Usuarios = new mongoose.model('Usuarios', userSchema);

module.exports = Usuarios;