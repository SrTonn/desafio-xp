import { Wallet } from '../database/models/Wallet';

const getBalance = async (userId: number) => {
  const balance = await Wallet.findOne({
    raw: true,
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  return balance;
};

export {
  getBalance,
};
