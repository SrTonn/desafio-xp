import { deposit, getBalance, withdraw, history } from '../../services/wallet.service';
import { Wallet } from '../../database/models/Wallet';
import { UserStock } from '../../database/models/UserStock';
import { WalletHistory } from '../../database/models/WalletHistory';
import sequelize from '../../database/models';
import * as Mock from '../mocks';

describe('Test wallet service', () => {
  const fakeId = 4;
  const expectedSuccessResponse = { success: true };

  it('Será validado que é possível consultar o saldo com sucesso', async () => {
    jest.spyOn(Wallet, 'findOne').mockResolvedValue(Mock.walletFindOne as Wallet);
    jest.spyOn(UserStock, 'findAll').mockResolvedValue(Mock.userStockFindAll as UserStock[]);
    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(Mock.walletHistoryFindAllGroup as never);

    const response = await getBalance(fakeId);
    expect(response).toEqual(Mock.getBalanceResponse);
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
    jest.spyOn(WalletHistory, 'findAll').mockResolvedValue(Mock.walletHistoryFindAll as never);

    const response = await history(fakeId);
    expect(response).toEqual(Mock.walletHistoryFindAll);
  });
});
