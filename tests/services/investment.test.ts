import { Stocks } from '../../src/database/models/Stocks';
import { UserStock } from '../../src/database/models/UserStock';
import { Wallet } from '../../src/database/models/Wallet';
import { buyAssets, sellAssets } from '../../src/services/investment.service'
import HttpException from '../../src/shared/http.exception';

describe('Test investment service', () => {
  const fakeId = 5;
  const stock = "XPBR31";
  const mockStocksResponse = {
    stock: "XPBR31",
    name: 'XP INC DR1',
    value: 98.86,
    volume: 100,
    logo: 'https://s3-symbol-logo.tradingview.com/xp--big.svg'
  };

  const mockUserStock = {
    userId: fakeId,
    stockCode: stock,
    availableQuantity: 15,
    investedAmount: 1482.9
  };

  it('Será validado que não é possível comprar ações com saldo inferior ao valor da ação', async () => {
    const body = { stock, value: 115 };
    const mockWalletResponse = { userId: fakeId, balance: 50 };

    jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletResponse as Wallet);
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(mockStocksResponse as never);

    let response = {} as HttpException;
    try {
      await buyAssets(fakeId, body);
    } catch (error) {
      response = error as HttpException;
    }

    expect(response.status).toBe(406);
    expect(response.message).toBe('Insufficient Balance');
  });

  it('Será validado que não é possível comprar ações acima da quantidade disponível para venda', async () => {
    const body = { stock, value: 10000 };
    const mockWalletResponse = { userId: fakeId, balance: 50000 };

    jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletResponse as Wallet);
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(mockStocksResponse as never);

    let response = {} as HttpException;
    try {
      await buyAssets(fakeId, body);
    } catch (error) {
      response = error as HttpException;
    }

    expect(response.status).toBe(406);
    expect(response.message).toBe('Quantity Requested Unavailable');
  });

  it('Será validado que é possível comprar ações com sucesso', async () => {
    const body = { stock, value: 115 };
    const mockWalletResponse = { userId: fakeId, balance: 5000 };

    const expectedResponse = {
      stockBought: 1,
      investedAmount: 98.86,
      change: 16.14,
    };

    jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletResponse as Wallet);
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(mockStocksResponse as never);

    const response = await buyAssets(fakeId, body);
    expect(response).toEqual(expectedResponse);
  });

  it('Será validado que não é possível vender mais ações do que a quantidade total disponível', async () => {
    const body = { stock, quantity: 50 };

    jest.spyOn(UserStock, 'findOne').mockResolvedValue(mockUserStock as UserStock);

    let response = {} as HttpException;
    try {
      await sellAssets(fakeId, body);
    } catch (error) {
      response = error as HttpException;
    }

    expect(response.status).toBe(406);
    expect(response.message).toBe('Insufficient Assets');
  });

  it('Será validado que é possível vender ações com sucesso', async () => {
    const body = { stock, quantity: 15 };

    const expectedResponse = {
      stockSold: stock,
      quantity: 15,
      value: 1482.9
    };

    jest.spyOn(UserStock, 'findOne').mockResolvedValue(mockUserStock as UserStock);

    const response = await sellAssets(fakeId, body);
    expect(response).toEqual(expectedResponse);
  });
});
