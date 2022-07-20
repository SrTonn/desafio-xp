import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';
import HttpException from '../shared/http.exception';
import sequelize from '../database/models';
import { UserStock } from '../database/models/UserStock';
import { walletManagement } from '../utils/managementWallet';

const getBalance = async (userId: number) => {
  const balance = await Wallet.findOne({
    attributes: { exclude: ['userId'] },
    include: { model: UserStock, as: 'stocks', attributes: { exclude: ['userId'] } },
    where: { userId },
  });

  return balance;
};

const deposit = async (userId: number, { value: depositValue }: { value: number }) => {
  const result = sequelize.transaction(async (t) => {
    await walletManagement(userId, depositValue, 1, t);
    return { success: true };
  });
  return result;
};

const withdraw = async (userId: number, { value: withdrawValue }: { value: number }) => {
  const wallet = await Wallet.findByPk(userId);
  if (wallet!.balance < withdrawValue) throw new HttpException(406, 'Insufficient Balance');

  return sequelize.transaction(async (t) => {
    await walletManagement(userId, -withdrawValue, 2, t);

    return { success: true };
  });
};

const history = async (userId: number) => {
  const response = await WalletHistory.findAll({
    raw: true,
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  return response;
};

export {
  getBalance,
  deposit,
  withdraw,
  history,
};
