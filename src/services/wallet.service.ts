import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';
import HttpException from '../shared/http.exception';

const getBalance = async (userId: number) => {
  const balance = await Wallet.findOne({
    raw: true,
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  return balance;
};

const deposit = async (userId: number, { value: depositValue }: { value: number }) => {
  try {
    await Wallet.increment({ balance: depositValue }, { where: { userId } });
    return { success: true };
  } catch (error) {
    throw new HttpException(500, 'Internal Server Error');
  }
};

const withdraw = async (userId: number, { value: withdrawValue }: { value: number }) => {
  const wallet = await Wallet.findByPk(userId);
  if (wallet!.balance < withdrawValue) throw new HttpException(406, 'Insufficient Balance');

  await Wallet.decrement({ balance: withdrawValue }, { where: { userId } });
  return { success: true };
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
