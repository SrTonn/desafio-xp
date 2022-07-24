import request from 'supertest';
import app from '../../app';
import { Transaction } from '../../database/models/Transaction';
import { User } from '../../database/models/User';
import { UserStock } from '../../database/models/UserStock';
import { Wallet } from '../../database/models/Wallet';
import { WalletHistory } from '../../database/models/WalletHistory';
import * as JWT from '../../utils/JWTToken';
import * as Mock from '../mocks';

describe('Test account controller', () => {
  beforeEach(() => {
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(Mock.fakeToken);
    jest.spyOn(JWT, 'authenticateToken').mockResolvedValue(Mock.payload);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Será validado que é possível criar conta com sucesso', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(Mock.userResponse);
    jest.spyOn(Wallet, 'create').mockResolvedValue(Mock.walletResponse);

    const response = await request(app)
      .post('/account/new')
      .send({
        firstName: 'Stephen',
        lastName: 'Curry',
        email: 'stephen.30curry@gmail.com',
        password: 'Curry@Stephen',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(Mock.fakeToken);
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(Mock.userFindOneORFindPK as User);
    const response = await request(app)
      .post('/account/login')
      .send({ email: 'test@gmail.com', password: 'senha123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.fakeToken);
  });

  it('Será validado que é possível fazer update do apelido do usuário', async () => {
    jest.spyOn(User, 'update').mockResolvedValue([1]);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);
    const response = await request(app)
    .put('/account/update')
    .set({ Authorization: Mock.fakeToken })
    .send({ nickName: 'little Ol' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.userFindOneORFindPK);
  });

  it('Será validado que é possível fazer remoção da conta do usuário', async () => {
    jest.spyOn(User, 'update').mockResolvedValue([1]);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);
    jest.spyOn(UserStock, 'findOne').mockResolvedValue({ ...Mock.userStock, availableQuantity: 0 } as UserStock);
    jest.spyOn(Transaction, 'destroy').mockResolvedValue(1);
    jest.spyOn(User, 'destroy').mockResolvedValue(1);
    jest.spyOn(UserStock, 'destroy').mockResolvedValue(1);
    jest.spyOn(Wallet, 'destroy').mockResolvedValue(1);
    jest.spyOn(WalletHistory, 'destroy').mockResolvedValue(1);
    jest.spyOn(Wallet, 'findByPk')
      .mockResolvedValue({ userId: Mock.fakeId, balance: 0 } as Wallet);

    const response = await request(app)
    .delete('/account/remove/me')
    .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(204);
  });

  it('Será validado que é possível fazer uma consulta da conta do usuário', async () => {
    jest.spyOn(User, 'findByPk').mockResolvedValue({
      ...Mock.userFindOneORFindPK,
      createdAt: "2022-07-24T14:03:54.000Z",
      updatedAt: "2022-07-24T14:03:54.000Z"
    } as never);

    const response = await request(app)
    .get('/account/me')
    .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      nickName: 'little Ol',
      firstName: "Ollie",
      lastName: "Bryant",
      email: "ollie.bryant@gmail.com",
      createdAt: "2022-07-24T14:03:54.000Z",
      updatedAt: "2022-07-24T14:03:54.000Z"
    });
  });

});
