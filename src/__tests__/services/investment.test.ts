import { Stocks } from '../../database/models/Stocks';
import { UserStock } from '../../database/models/UserStock';
import { Wallet } from '../../database/models/Wallet';
import { buyAssets, sellAssets } from '../../services/investment.service';
import HttpException from '../../shared/http.exception';
import sequelize from '../../database/models';
import * as Mock from '../mocks';

describe('Test investment service', () => {
  const fakeId = 5;
  const stock = 'XPBR31';

  it(
    'Será validado que não é possível comprar ações com saldo inferior ao valor da ação',
    async () => {
      const body = { stock, value: 115 };

      jest.spyOn(Wallet, 'findByPk').mockResolvedValue(Mock.walletFindByPk as Wallet);
      jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stocksFindOne as Stocks);

      let response = {} as HttpException;
      try {
        await buyAssets(fakeId, body);
      } catch (error) {
        response = error as HttpException;
      }

      expect(response.status).toBe(406);
      expect(response.message).toBe('Insufficient Balance');
    },
  );

  it(
    'Será validado que não é possível comprar ações acima da quantidade disponível para venda',
    async () => {
      const body = { stock, value: 10000 };
      const mockWalletResponse = { userId: fakeId, balance: 50000 };

      jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletResponse as Wallet);
      jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stocksFindOne as Stocks);

      let response = {} as HttpException;
      try {
        await buyAssets(fakeId, body);
      } catch (error) {
        response = error as HttpException;
      }

      expect(response.status).toBe(406);
      expect(response.message).toBe('Quantity Requested Unavailable');
    },
  );

  it('Será validado que é possível comprar ações com sucesso', async () => {
    const body = { stock, value: 115 };
    const mockWalletResponse = { userId: fakeId, balance: 5000 };

    jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletResponse as Wallet);
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stocksFindOne as Stocks);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(Mock.investmentBuyResponse as never);

    const response = await buyAssets(fakeId, body);
    expect(response).toEqual(Mock.investmentBuyResponse);
  });

  it(
    'Será validado que não é possível vender mais ações do que a quantidade total disponível',
    async () => {
      const body = { stock, quantity: 50 };

      jest.spyOn(UserStock, 'findOne').mockResolvedValue(Mock.userStockFindOne as UserStock);

      let response = {} as HttpException;
      try {
        await sellAssets(fakeId, body);
      } catch (error) {
        response = error as HttpException;
      }

      expect(response.status).toBe(406);
      expect(response.message).toBe('Insufficient Assets');
    },
  );

  it('Será validado que é possível vender ações com sucesso', async () => {
    const body = { stock, quantity: 15 };

    jest.spyOn(UserStock, 'findOne').mockResolvedValue(Mock.userStockFindOne as UserStock);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(Mock.investmentSellResponse as never);

    const response = await sellAssets(fakeId, body);
    expect(response).toEqual(Mock.investmentSellResponse);
  });
});
