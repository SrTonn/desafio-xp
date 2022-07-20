import { Stocks } from '../database/models/Stocks';
import { Wallet } from '../database/models/Wallet';
import HttpException from '../shared/http.exception';
import { investmentCalculator } from '../utils/calculator';
import sequelize from '../database/models';
import { UserStock } from '../database/models/UserStock';
import { walletManagement } from '../utils/managementWallet';
import { userStockManagement } from '../utils/managementStock';
import { transactionRegistry } from '../utils/managementTransaction';

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
  await sequelize.transaction(async (t) => {
    await walletManagement(userId, -investment.investedAmount, 3, t);
    await userStockManagement(userId, investment.stockBought, stock, t);
    await transactionRegistry(userId, investment, stock, t);
  });

  return investment;
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
    const stockObj = await Stocks.findOne({ where: { stock }, transaction: t });

    const investment = Number((stockObj!.value * investmentValue).toFixed(2));
    await walletManagement(userId, investment, 4, t);
    await userStockManagement(userId, -investmentValue, stock, t);

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
