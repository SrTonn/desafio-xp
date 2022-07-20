import { Stocks } from '../database/models/Stocks';

const getAssets = async (stockCode: string | null = null) => {
  if (!stockCode) {
    return Stocks.findAll();
  }
  return Stocks.findOne({
    raw: true,
    where: { stock: stockCode },
  });
};

export {
  getAssets,
};
