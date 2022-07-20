import { Transaction } from 'sequelize/types';
import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';

export const walletManagement = async (
  userId: number,
  value: number,
  type: number,
  t?: Transaction,
) => {
  await Wallet.increment(
    { balance: value },
    { where: { userId }, transaction: t },
  );

  await WalletHistory.create(
    { userId, value: Math.abs(value), type },
    { transaction: t },
  );
};
