import request from 'supertest';
import app from '../../app';
import { Stocks } from "../../database/models/Stocks";
import * as Mock from '../mocks';
import * as JWT from '../../utils/JWTToken';
import { User } from '../../database/models/User';

describe('Test assets controller', () => {
  beforeEach(() => {
    jest.spyOn(JWT, 'generateJWTToken').mockReturnValue(Mock.fakeToken);
    jest.spyOn(JWT, 'authenticateToken').mockResolvedValue(Mock.payload);
    jest.spyOn(User, 'findByPk').mockResolvedValue(Mock.userFindOneORFindPK as User);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Será validado que é possível listar uma ação ao buscar pelo código', async () => {
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stockList[0] as Stocks);

    const response = await request(app)
      .get('/assets/AMZO34')
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.stockList[0]);
  });

  it('Será validado que é possível listar todas ações', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue(Mock.stockList as Stocks[]);

    const response = await request(app)
      .get('/assets/')
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Mock.stockList);
  });

  it('Será validado que é possível atualizar todas ações', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue(Mock.stockList as Stocks[]);
    jest.spyOn(Stocks, 'bulkCreate').mockResolvedValue([{}] as Stocks[]);

    const response = await request(app)
      .get('/assets/update')
      .set({ Authorization: Mock.fakeToken });

    expect(response.statusCode).toBe(200);
  });
});
