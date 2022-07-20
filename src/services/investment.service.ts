import { Report } from '../database/models/Report';
import { Stocks } from '../database/models/Stocks';
import { Transaction } from '../database/models/Transaction';
import { Wallet } from '../database/models/Wallet';
import HttpException from '../shared/http.exception';
import { investmentCalculator } from '../utils/calculator';

import sequelize from '../database/models';
import { UserStock } from '../database/models/UserStock';

const buyAssets = async (
  userId: number,
  { stock, value: investmentValue }: { stock: string, value: number },
) => {
  const wallet = await Wallet.findByPk(userId);
  const stockData = await Stocks.findOne({ raw: true, where: { stock } });
  if (!stockData) throw new HttpException(404, 'Stock Not Found');

  if (investmentValue > wallet!.balance) {
    throw new HttpException(406, 'Insufficient Balance');
  }

  const investment = investmentCalculator(stockData.value, investmentValue);
  if (stockData.volume < investment.stockBought) {
    throw new HttpException(406, 'Quantity Requested Unavailable');
  }

  if (investment.error) throw new HttpException(406, investment.error);

  return sequelize.transaction(async (t) => {
    await Wallet.decrement(
      { balance: investment.investedAmount },
      { where: { userId }, transaction: t },
    );

    await Stocks.decrement(
      { volume: investment.stockBought },
      { where: { stock }, transaction: t },
    );

    const [response]: any = await UserStock.increment(
      { availableQuantity: investment.stockBought },
      { where: { userId, stockCode: stock }, transaction: t },
    );

    if (!response[1]) {
      await UserStock.create({
        userId,
        stockCode: stock,
        availableQuantity: investment.stockBought,
      }, { transaction: t });
    }

    const transaction = await Transaction.create({ userId, stockCode: stock }, { transaction: t });
    await Report.create({
      transactionId: transaction.id,
      quantity: investment.stockBought,
      type: 1,
      value: investment.investedAmount,
    }, { transaction: t });

    return investment;
  });
};

const sellAssets = async (
  userId: number,
  { stock, value: investmentValue }: { stock: string, value: number },
) => {
  const userStock = await UserStock.findOne({ where: { userId, stockCode: stock }, raw: true });
  if (!userStock) throw new HttpException(404, 'Asset Not Found');

  const quantity = userStock.availableQuantity;
  if (quantity! < investmentValue) throw new HttpException(406, 'Insufficient Assets');

  return sequelize.transaction(async (t) => {
    await UserStock.decrement(
      { availableQuantity: investmentValue },
      { where: { userId, stockCode: stock }, transaction: t },
    );

    await Stocks.increment(
      { volume: investmentValue },
      { where: { stock }, transaction: t },
    );

    const stockObj = await Stocks.findOne({ where: { stock }, transaction: t });
    await Wallet.increment({ balance: stockObj!.value }, { where: { userId }, transaction: t });

    return {
      stockSold: stock,
      quantity: investmentValue,
      value: Number((stockObj!.value * investmentValue).toFixed(2)),
    };
  });
};

export {
  buyAssets,
  sellAssets,
};
