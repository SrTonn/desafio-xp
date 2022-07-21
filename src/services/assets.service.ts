import { Stocks } from '../database/models/Stocks';
import { randomVariation } from '../utils/generateRandomValue';

const getAssets = async (stockCode: string | null = null) => {
  if (!stockCode) {
    return Stocks.findAll();
  }
  return Stocks.findOne({
    raw: true,
    where: { stock: stockCode },
  });
};

const updateAssets = async () => {
  const stocks = await Stocks.findAll({ raw: true });
  const updatedStocks = stocks
    .map((stock) => ({ ...stock, value: randomVariation(stock.value, 15) }));
  await Stocks.bulkCreate(
    updatedStocks,
    { updateOnDuplicate: ['stock', 'name', 'value', 'logo'] },
  );
};

export {
  getAssets,
  updateAssets,
};
