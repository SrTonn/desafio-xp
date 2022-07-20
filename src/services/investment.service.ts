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
  if (investment.error) throw new HttpException(406, investment.error);

  return sequelize.transaction(async (t) => {
    await Wallet.decrement(
      { balance: investment.investedAmount },
      { where: { userId }, transaction: t },
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

    return investment;
  });
};

export {
  buyAssets,
};
