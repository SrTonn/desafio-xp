import { Transaction } from 'sequelize/types';
import { Stocks } from '../database/models/Stocks';
import { UserStock } from '../database/models/UserStock';

export const userStockManagement = async (
  userId: number,
  investment: number,
  stock: string,
  t?: Transaction,
) => {
  const [response]: any = await UserStock.increment(
    { availableQuantity: investment },
    { where: { userId, stockCode: stock }, transaction: t },
  );

  if (!response[1]) {
    await UserStock.create({
      userId,
      stockCode: stock,
      availableQuantity: investment,
    }, { transaction: t });
  }

  await Stocks.decrement(
    { volume: investment },
    { where: { stock }, transaction: t },
  );
};
