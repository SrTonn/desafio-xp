import { Transaction } from 'sequelize/types';
import { Report } from '../database/models/Report';
import { Transaction as TransactionModel } from '../database/models/Transaction';
import { IInvestment } from '../interfaces';

export const transactionRegistry = async (
  userId: number,
  investment: IInvestment,
  stockCode: string,
  t?: Transaction,
) => {
  const transaction = await TransactionModel.create({ userId, stockCode }, { transaction: t });

  await Report.create({
    transactionId: transaction.id,
    quantity: investment.stockBought,
    type: 1,
    value: investment.investedAmount,
  }, { transaction: t });
};
