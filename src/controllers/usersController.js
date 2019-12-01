const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { errorMessage } = require('../helpers');

const signUp = async (req, res) => {
  //verifica se o email já está cadastrado no banco de dados
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json(errorMessage('email já cadastrado'));

  // cria um novo usuário e grava a senha criptografada
  const user = new User(req.body);
  user.hashPassword();
  user.generateToken();

  try {
    const savedUser = await user.save();
    return res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const signIn = async (req, res) => {
  //verifica se o email está cadastrado no banco de dados
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(401).json(errorMessage('usuário e/ou senha inválidos'));

  //verificação de senha
  if (!user.validatePassword())
    return res.status(401).json(errorMessage('usuário e/ou senha inválidos'));

  // atualiza horario do ultimo login do usuário
  user.update(
    {
      $set: {
        ultimo_login: Date.now(),
        data_atualizacao: Date.now(),
      },
    },
    err => {
      if (err) return res.status(500).send(err);
    },
  );
  return res.status(200).send(user);
};

const getUser = async (req, res) => {
  const token = req.header('auth-token');
  let user;
  try {
    user = await User.findOne({ _id: req.params.id });
  } catch (error) {
    return res.status(400).send(errorMessage('usuário inválido'));
  }

  if (!user) return res.status(400).send(errorMessage('usuário inválido'));

  if (!token || user.token !== token)
    return res.status(401).send(errorMessage('acesso negado'));

  jwt.verify(token, 'secretKey', err => {
    if (err)
      return res
        .status(401)
        .send(errorMessage('sessão inválida, token expirado'));

    return res.status(200).send(user);
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) return res.status(400).json(errorMessage('email já cadastrado'));

  try {
    await user.deleteOne({ _id: req.params.id });
  } catch (error) {
    return res
      .status(500)
      .json(errorMessage('ocorreu um erro, tente novamente'));
  } finally {
    return res.status(200).send('usuário deletado com sucesso');
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
  deleteUser,
};
