import { Transaction } from 'sequelize/types';
import { Stocks } from '../database/models/Stocks';
import { UserStock } from '../database/models/UserStock';

export const userStockManagement = async (
  userId: number,
  investmentQuantity: number,
  stock: string,
  investedAmount: number,
  t?: Transaction,
) => {
  const [response]: any = await UserStock.increment(
    { availableQuantity: investmentQuantity, investedAmount },
    { where: { userId, stockCode: stock }, transaction: t },
  );

  if (!response[1]) {
    await UserStock.create({
      userId,
      stockCode: stock,
      availableQuantity: investmentQuantity,
      investedAmount,
    }, { transaction: t });
  }

  await Stocks.decrement(
    { volume: investmentQuantity },
    { where: { stock }, transaction: t },
  );
};
