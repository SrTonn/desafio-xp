import { User } from '../../src/database/models/User';
import * as JWT from '../../src/utils/JWTToken';
import { authentication, createUser, removeUser, updateUser } from '../../src/services/account.service';
import { Wallet } from '../../src/database/models/Wallet';
import { UserStock } from '../../src/database/models/UserStock';
import HttpException from '../../src/shared/http.exception';

describe('Test account service', () => {
  const mockBodyNewAccount = {
    firstName: "Stephen",
    lastName: "Curry",
    email: "stephen.curry@gmail.com",
    password: "Curry@Stephen",
  };

  const fakeId = 4;

  const mockUserFindOneORFindPK = {
    nickName: "little Ol",
    firstName: "Ollie",
    lastName: "Bryant",
    email: "ollie.bryant@gmail.com"
  }

  const mockUserResponse = {
    id: fakeId,
    nickName: undefined,
    firstName: "Stephen",
    lastName: "Curry",
    email: "stephen.curry@gmail.com",
    password: "Curry@Stephen",
    updatedAt: '2022-07-22T13:27:01.183Z',
    createdAt: '2022-07-22T13:27:01.183Z',
    toJSON() {}
  };

  const mockWalletResponse = { balance: 0, userId: fakeId };

  const fakeToken = '@fakeToken123!#';

  it('Será validado que é possível criar conta com sucesso', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(mockUserResponse);
    jest.spyOn(Wallet, 'create').mockResolvedValue(mockWalletResponse);
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(fakeToken);

    const response = await createUser(mockBodyNewAccount);
    expect(response.token).toEqual(fakeToken);
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUserFindOneORFindPK as User);
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(fakeToken);
    const response = await authentication({ email: 'test@gmail.com', password: 'senha123' });

    expect(response).toEqual({ token: fakeToken });
  });
  
  it('Será validado que é possível fazer update do apelido do usuário', async () => {

    jest.spyOn(User, 'update').mockResolvedValue([1]);
    jest.spyOn(User, 'findByPk').mockResolvedValue(mockUserFindOneORFindPK as User);
    const response = await updateUser(fakeId, { nickName: "little Ol" });

    expect(response).toEqual(mockUserFindOneORFindPK);
  });

  it('Será validado não é possível remover um usuário com saldo acima de 0', async () => {
    const mockResponse = {
      nickName: "little Ol",
      firstName: "Ollie",
      lastName: "Bryant",
      email: "ollie.bryant@gmail.com",
    }
    const mockUserStock = {
      userId: fakeId,
      stockCode: 'AGRO3',
      availableQuantity: 1,
      investedAmount: 23.24
    }
    jest.spyOn(User, 'findByPk').mockResolvedValue(mockResponse as User);
    jest.spyOn(Wallet, 'findByPk').mockResolvedValue({ userId: fakeId, balance: 9929.11 } as Wallet);
    jest.spyOn(UserStock, 'findOne').mockResolvedValue(mockUserStock as UserStock);

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
