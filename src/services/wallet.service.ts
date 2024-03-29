import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';
import HttpException from '../shared/http.exception';
import sequelize from '../database/models';
import { UserStock } from '../database/models/UserStock';
import { walletManagement } from '../utils/managementWallet';
import { IHistory } from '../interfaces';

const getBalance = async (userId: number) => {
  const wallet = await Wallet.findOne({
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  const userStocks = await UserStock
    .findAll({ raw: true, where: { userId }, attributes: { exclude: ['userId'] } });

  const investmentAmount = userStocks.reduce((acc, { investedAmount }) => acc + investedAmount, 0);
  const stocks = userStocks
    .map((obj) => ({ ...obj, investedAmount: obj.investedAmount }));

  const history = await WalletHistory.findAll({
    raw: true,
    where: { userId },
    group: ['type'],
    attributes: [
      'type',
      [sequelize.fn('sum', sequelize.col('value')), 'totalAmount'],
    ],
  });

  const historyObj: IHistory = history
    .reduce((acc, { type, totalAmount }: any) => ({ ...acc, [type]: totalAmount }), {});

  return {
    balance: wallet?.balance,
    currentAssets: Number(investmentAmount.toFixed(2)),
    details: {
      totalDeposit: historyObj.deposit || null,
      totalWithdraw: historyObj.withdraw || null,
      totalAssetsBought: historyObj.buyAssets || null,
      totalAssetsSold: historyObj.sellAssets || null,
    },
    activeStocks: stocks,
  };
};

const deposit = async (userId: number, { value: depositValue }: { value: number }) => {
  const result = sequelize.transaction(async (t) => {
    await walletManagement(userId, depositValue, 1, t);
    return { success: true };
  });
  return result;
};

const withdraw = async (userId: number, { value: withdrawValue }: { value: number }) => {
  const wallet = await Wallet.findByPk(userId);
  if (wallet!.balance < withdrawValue) throw new HttpException(406, 'Insufficient Balance');

  return sequelize.transaction(async (t) => {
    await walletManagement(userId, -withdrawValue, 2, t);

    return { success: true };
  });
};

const history = async (userId: number) => {
  const response = await WalletHistory.findAll({
    raw: true,
    attributes: { exclude: ['userId'] },
    where: { userId },
  });

  return response;
};

export {
  getBalance,
  deposit,
  withdraw,
  history,
};
