import { User } from '../../database/models/User';
import * as JWT from '../../utils/JWTToken';
import { authentication, createUser, removeUser, updateUser } from '../../services/account.service';
import { Wallet } from '../../database/models/Wallet';
import { UserStock } from '../../database/models/UserStock';
import HttpException from '../../shared/http.exception';
import * as Mock from '../mocks';

describe('Test account service', () => {
  const mockBodyNewAccount = {
    firstName: 'Stephen',
    lastName: 'Curry',
    email: 'stephen.curry@gmail.com',
    password: 'Curry@Stephen',
  };

  const fakeId = 4;

  // const mockUserFindOneORFindPK = {
  //   nickName: 'little Ol',
  //   firstName: 'Ollie',
  //   lastName: 'Bryant',
  //   email: 'ollie.bryant@gmail.com',
  // };

  const fakeToken = '@fakeToken123!#';

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Será validado que é possível criar conta com sucesso', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(Mock.userResponse);
    jest.spyOn(Wallet, 'create').mockResolvedValue(Mock.walletResponse);
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(Mock.fakeToken);

    const response = await createUser(mockBodyNewAccount);
    expect(response.token).toEqual(fakeToken);
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(Mock.userFindOneORFindPK as User);
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(fakeToken);
    const response = await authentication({ email: 'test@gmail.com', password: 'senha123' });

    expect(response).toEqual({ token: fakeToken });
  });

  it(
    'Será validado que não é possível fazer login com dados de uma conta inexistente',
    async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null as never);
      jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(fakeToken);

      let response = {} as HttpException;

      try {
        await authentication({ email: 'usuario.inexistente@gmail.com', password: 'senha12345' });
      } catch (error) {
        response = error as HttpException;
      }

      expect(response.status).toBe(400);
      expect(response.message).toBe('Invalid fields');
    },
  );

  it('Será validado que é possível fazer update do apelido do usuário', async () => {
    jest.spyOn(User, 'update').mockResolvedValue([1]);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);

    const response = await updateUser(fakeId, { nickName: 'little Ol' });

    expect(response).toEqual(Mock.userFindOneORFindPK);
  });

  it('Será validado que não é possível remover um usuário com saldo acima de 0', async () => {
    const mockResponse = {
      nickName: 'little Ol',
      firstName: 'Ollie',
      lastName: 'Bryant',
      email: 'ollie.bryant@gmail.com',
    };

    jest.spyOn(User, 'findByPk').mockResolvedValue(mockResponse as User);
    jest.spyOn(UserStock, 'findOne').mockResolvedValue(Mock.userStock as UserStock);
    jest.spyOn(Wallet, 'findByPk')
      .mockResolvedValue({ userId: fakeId, balance: 9929.11 } as Wallet);

    let response = {} as HttpException;
    try {
      await removeUser(fakeId);
    } catch (error) {
      response = error as HttpException;
    }

    expect(response.status).toBe(406);
    expect(response.message).toBe('Account with available balance');
  });
});
