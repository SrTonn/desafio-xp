import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';
import HttpException from '../shared/http.exception';
import sequelize from '../database/models';

const getBalance = async (userId: number) => {
  const balance = await Wallet.findOne({
    raw: true,
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  return balance;
};

const deposit = async (userId: number, { value: depositValue }: { value: number }) => {
  const result = sequelize.transaction(async (t) => {
    await Wallet.increment({ balance: depositValue }, { where: { userId } });
    await WalletHistory.create({ userId, value: depositValue, type: 1 }, { transaction: t });
    return { success: true };
  });
  return result;
};

const withdraw = async (userId: number, { value: withdrawValue }: { value: number }) => {
  const wallet = await Wallet.findByPk(userId);
  if (wallet!.balance < withdrawValue) throw new HttpException(406, 'Insufficient Balance');
  return sequelize.transaction(async (t) => {
    await Wallet.decrement({ balance: withdrawValue }, { where: { userId }, transaction: t });

    await WalletHistory.create({ userId, value: withdrawValue, type: 2 }, { transaction: t });
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
