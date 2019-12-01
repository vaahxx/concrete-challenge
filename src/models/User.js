const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Schema de usuários
// instancia um novo schema, que representa o objeto usuário - utilizado no model
const userSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    senha: {
      type: String,
      required: true,
    },
    telefones: [
      {
        _id: false,
        numero: { type: Number },
        ddd: { type: Number },
      },
    ],
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao: { type: Date, default: Date.now },
    ultimo_login: { type: Date, default: Date.now },
    token: { type: String },
  },
  {
    versionKey: false,
  },
);

userSchema.methods.hashPassword = async function() {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(this.senha, salt);

  this.senha = hashedPassword;
};

userSchema.methods.generateToken = async function() {
  // gera o token do usuário
  const generatedToken = await jwt.sign({ id: this._id }, 'secretKey', {
    // o token expira em 30 minutos
    expiresIn: '30m',
  });
  this.token = generatedToken;
  console.log(this.token);
};

userSchema.methods.validatePassword = async function() {
  const validPassword = await bcrypt.compare(req.body.senha, user.senha);

  if (!validPassword) return false;

  return true;
};



// cria o model de usuários
// este método recebe como parametros uma string com o nome do model e um objeto Schema
module.exports = new mongoose.model('User', userSchema);
