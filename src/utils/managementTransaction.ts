import { Transaction } from 'sequelize/types';
import { Report } from '../database/models/Report';
import { Transaction as TransactionModel } from '../database/models/Transaction';

export const transactionRegistry = async (
  userId: number,
  stockBought: number,
  value: number,
  stockCode: string,
  type: number,
  t?: Transaction,
) => {
  const transaction = await TransactionModel.create({ userId, stockCode }, { transaction: t });

  await Report.create(
    { transactionId: transaction.id, quantity: stockBought, type, value },
    { transaction: t },
  );
};
