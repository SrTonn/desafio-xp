import { deposit, getBalance, withdraw, history } from '../../services/wallet.service';
import { Wallet } from '../../database/models/Wallet';
import { UserStock } from '../../database/models/UserStock';
import { WalletHistory } from '../../database/models/WalletHistory';
import sequelize from '../../database/models';

describe('Test wallet service', () => {
  const fakeId = 4;
  const expectedSuccessResponse = { success: true };

  it('Será validado que é possível consultar o saldo com sucesso', async () => {
    const mockUserStock = [
      { stockCode: 'AMZO34', availableQuantity: 86, investedAmount: 348.3 },
      { stockCode: 'XPBR31', availableQuantity: 7, investedAmount: 692.02 },
    ];

    const mockWalletHistory = [
      { type: 'deposit', totalAmount: 5000 },
      { type: 'withdraw', totalAmount: 2000 },
      { type: 'buyAssets', totalAmount: 1040.32 },
      { type: 'sellAssets', totalAmount: 60.75 },
    ];

    const [
      { totalAmount: depositWalletHistory },
      { totalAmount: withdrawWalletHistory },
      { totalAmount: buyAssets },
      { totalAmount: sellAssets },
    ] = mockWalletHistory;

    const balance = (depositWalletHistory + sellAssets) - withdrawWalletHistory - buyAssets;
    const mockWalletResponse = { balance };

    const expectedResponse = {
      balance,
      currentAssets: 1040.32,
      details: {
        totalDeposit: 5000,
        totalWithdraw: 2000,
        totalAssetsBought: 1040.32,
        totalAssetsSold: 60.75,
      },
      activeStocks: mockUserStock,
    };

    jest.spyOn(Wallet, 'findOne').mockResolvedValue(mockWalletResponse as Wallet);
    jest.spyOn(UserStock, 'findAll').mockResolvedValue(mockUserStock as never);
    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(mockWalletHistory as never);

    const response = await getBalance(fakeId);
    expect(response).toEqual(expectedResponse);
  });

  it('Será validado que é possível depositar o valor com sucesso', async () => {
    const mockWalletIncrement = [[undefined, 1]];
    const mockWalletHistory = {
      id: 20,
      userId: fakeId,
      value: 5000,
      type: 1,
      createdAt: '2022-07-23T17:42:03.954Z',
    };

    jest.spyOn(Wallet, 'increment').mockResolvedValue(mockWalletIncrement as never);
    jest.spyOn(WalletHistory, 'create').mockResolvedValue(mockWalletHistory as never);
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(expectedSuccessResponse as never);

    const response = await deposit(fakeId, { value: 5000 });
    expect(response).toEqual(expectedSuccessResponse);
  });

  it('Será validado que é possível sacar o valor com sucesso', async () => {
    const mockWalletIncrement = [[undefined, 1]];
    const mockWalletHistory = {
      id: 21,
      userId: fakeId,
      value: 5000,
      type: 2,
      createdAt: '2022-07-23T17:42:03.954Z',
    };

    jest.spyOn(Wallet, 'findByPk').mockResolvedValue(mockWalletIncrement as never);
    jest.spyOn(Wallet, 'increment').mockResolvedValue(mockWalletIncrement as never);
    jest.spyOn(WalletHistory, 'create').mockResolvedValue(mockWalletHistory as never);

    const response = await withdraw(fakeId, { value: 5000 });
    expect(response).toEqual(expectedSuccessResponse);
  });

  it('Será validado que é possível consultar o histórico com sucesso', async () => {
    const mockWalletHistory = [
      {
        value: 5000,
        type: 'deposit',
        createdAt: '2022-07-23T17:05:35.000Z',
      },
      {
        value: 2000,
        type: 'withdraw',
        createdAt: '2022-07-23T17:05:43.000Z',
      },
      {
        value: 348.3,
        type: 'buyAssets',
        createdAt: '2022-07-23T17:06:00.000Z',
      },
      {
        value: 692.02,
        type: 'buyAssets',
        createdAt: '2022-07-23T17:06:58.000Z',
      }];

    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(mockWalletHistory as never);

    const response = await history(fakeId);
    expect(response).toEqual(mockWalletHistory);
  });
});
