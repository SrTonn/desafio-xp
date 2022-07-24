import request from 'supertest';
import app from '../../app';
import * as Mock from '../mocks';
import * as JWT from '../../utils/JWTToken';
import { User } from '../../database/models/User';
import { Wallet } from '../../database/models/Wallet';
import { UserStock } from '../../database/models/UserStock';
import { WalletHistory } from '../../database/models/WalletHistory';
import sequelize from '../../database/models';

describe('Test wallet controller', () => {
  beforeEach(() => {
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(Mock.fakeToken);
    jest.spyOn(JWT, 'authenticateToken').mockResolvedValue(Mock.payload);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Será validado que é possível consultar o saldo', async () => {
    jest.spyOn(Wallet, 'findOne').mockResolvedValue(Mock.walletFindOne as Wallet);
    jest.spyOn(UserStock, 'findAll').mockResolvedValue(Mock.userStockFindAll as UserStock[]);
    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(Mock.walletHistoryFindAllGroup as never);

    const response = await request(app)
      .get('/wallet/balance')
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.getBalanceResponse);
  });

  it('Será validado que é possível fazer deposito', async () => {

    jest.spyOn(Wallet, 'increment').mockResolvedValue(Mock.walletIncrementSuccess as never);
    jest.spyOn(WalletHistory, 'create').mockResolvedValue(Mock.walletHistoryCreate as never);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(Mock.successTrue as never);

    const response = await request(app)
      .post('/wallet/deposit')
      .send({ value: 5000 })
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(Mock.successTrue);
  });

  it('Será validado que é possível fazer saque', async () => {
    jest.spyOn(Wallet, 'findByPk').mockResolvedValue({} as never);
    jest.spyOn(Wallet, 'increment').mockResolvedValue([] as never);
    jest.spyOn(WalletHistory, 'create').mockResolvedValue(Mock.walletHistoryCreate as never);

    const response = await request(app)
      .post('/wallet/withdraw')
      .send({ value: 5000 })
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(Mock.successTrue);
  });

  it('Será validado que é possível consultar o histórico com sucesso', async () => {
    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(Mock.walletHistoryFindAll as never);

    const response = await request(app)
      .get('/wallet/history')
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.walletHistoryFindAll);
  });

});
