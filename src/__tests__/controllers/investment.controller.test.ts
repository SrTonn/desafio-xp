import request from 'supertest';
import app from '../../app';
import * as Mock from '../mocks';
import * as JWT from '../../utils/JWTToken';
import { User } from '../../database/models/User';
import { Wallet } from '../../database/models/Wallet';
import sequelize from '../../database/models';
import { Stocks } from '../../database/models/Stocks';
import { UserStock } from '../../database/models/UserStock';

describe('Test investment controller', () => {
  beforeEach(() => {
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(Mock.fakeToken);
    jest.spyOn(JWT, 'authenticateToken').mockResolvedValue(Mock.payload);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Será validado que é possível comprar ações com sucesso', async () => {
    jest.spyOn(Wallet, 'findByPk').mockResolvedValue({...Mock.walletFindByPk, balance: 5000} as Wallet);
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stocksFindOne as Stocks);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(Mock.investmentBuyResponse as never);

    const response = await request(app)
      .post('/investment/buy')
      .send({
        stock: "XPBR31",
        value: 115
      })
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(Mock.investmentBuyResponse);
  });

  it('Será validado que é possível vender ações com sucesso', async () => {
    jest.spyOn(UserStock, 'findOne').mockResolvedValue(Mock.userStockFindOne as UserStock);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(Mock.investmentSellResponse as never);

    const response = await request(app)
      .post('/investment/sell')
      .send({
        stock: "XPBR31",
        quantity: 1
      })
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(Mock.investmentSellResponse);
  });

});
