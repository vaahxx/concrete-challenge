const axios = require('axios');

const baseURL = 'http://localhost:5000/usuarios/';

describe('usersController', () => {
  let axiosInstance;
  let validUser;
  let userExample = {
    nome: 'vale',
    email: 'valentina26@email.com',
    senha: '1234',
    telefones: [
      {
        numero: '123456789',
        ddd: '11',
      },
    ],
  };
  beforeAll(() => {
    axiosInstance = axios.create({
      baseURL,
    });
  });

  it('deve criar um usuário', async () => {
    const response = await axiosInstance.post('cadastrar', userExample);

    validUser = response.data;

    expect(validUser).not.toBeUndefined();
    expect(validUser.nome).toEqual(userExample.nome);
    expect(validUser.email).toEqual(userExample.email);
  });

  it('get user deve funcionar', async () => {
    const response = await axiosInstance.get(`entrar/${validUser._id}`, {
      headers: {
        'auth-token': validUser.token,
      },
    });

    expect(response.data.nome).toEqual(validUser.nome);
    expect(response.data.email).toEqual(validUser.email);
  });

  it('o sign in deve funcionar como esperado', async () => {
    const { email, senha } = userExample;
    const response = await axiosInstance.post('entrar', {
      email,
      senha,
    });

    expect(response.data.nome).toEqual(validUser.nome);
    expect(response.data.email).toEqual(validUser.email);
  });

  it('deleta o usuario com sucesso', async () => {
    const response = await axiosInstance.delete(`remover/${validUser._id}`);

    expect(response.status).toEqual(200);
    expect(response.data).toEqual('usuário deletado com sucesso');
  });

  it('get user deve retornar erro quando usuário é inválido', async () => {
    try {
      await axiosInstance.get('entrar/9asjdoiasjdiaojsd');
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.mensagem).toEqual('usuário inválido');
    }
  });
});
