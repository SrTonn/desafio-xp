export const fakeId = 4;

export const userResponse = {
  id: fakeId,
  nickName: undefined,
  firstName: 'Stephen',
  lastName: 'Curry',
  email: 'stephen.curry@gmail.com',
  password: 'Curry@Stephen',
  updatedAt: '2022-07-22T13:27:01.183Z',
  createdAt: '2022-07-22T13:27:01.183Z',
  toJSON() {},
};

export const walletResponse = { balance: 0, userId: fakeId };

export const fakeToken = '@fakeToken123!#';

export const userFindOneORFindPK = {
  nickName: 'little Ol',
  firstName: 'Ollie',
  lastName: 'Bryant',
  email: 'ollie.bryant@gmail.com',
};

export const payload = {
  id: fakeId,
  nickName: null,
  firstName: 'Ollie',
  lastName: 'Bryant',
  email: 'ollie.bryant@gmail.com',
  iat: 1658624099,
  exp: 1658710499
}

export const userStock = {
  userId: fakeId,
  stockCode: 'AGRO3',
  availableQuantity: 1,
  investedAmount: 23.24,
};

export const stockList = [{
  stock: 'AGRO3',
  name: 'BRASILAGRO',
  value: 23.24,
  volume: 53089,
  logo: 'https://s3-symbol-logo.tradingview.com/brasilagro--big.svg',
},
{
  stock: 'AMZO34',
  name: 'AMAZON DRN',
  value: 4.05,
  volume: 231163,
  logo: 'https://s3-symbol-logo.tradingview.com/amazon--big.svg',
},
{
  stock: 'ASAI3',
  name: 'ASSAI',
  value: 15.53,
  volume: 45609,
  logo: 'https://s3-symbol-logo.tradingview.com/assai-on-nm--big.svg',
}];

export const userStockFindAll = [
  { stockCode: 'AMZO34', availableQuantity: 86, investedAmount: 348.3 },
  { stockCode: 'XPBR31', availableQuantity: 7, investedAmount: 692.02 },
];

export const walletHistoryFindAllGroup = [
  { type: 'deposit', totalAmount: 5000 },
  { type: 'withdraw', totalAmount: 2000 },
  { type: 'buyAssets', totalAmount: 1040.32 },
  { type: 'sellAssets', totalAmount: 60.75 },
];

const [
  { totalAmount: depositWalletHistory },
  { totalAmount: withdrawWalletHistory },
  { totalAmount: buyAssets },
  { totalAmount: sellAssets },
] = walletHistoryFindAllGroup;

const balance = (depositWalletHistory + sellAssets) - withdrawWalletHistory - buyAssets;

export const walletFindOne = { balance };

export const getBalanceResponse = {
  balance,
  currentAssets: 1040.32,
  details: {
    totalDeposit: 5000,
    totalWithdraw: 2000,
    totalAssetsBought: 1040.32,
    totalAssetsSold: 60.75,
  },
  activeStocks: userStockFindAll,
};

export const walletIncrementSuccess = [[undefined, 1]];
export const walletHistoryCreate = {
  id: 21,
  userId: fakeId,
  value: 5000,
  type: 2,
  createdAt: '2022-07-23T17:42:03.954Z',
};

export const successTrue = { success: true };

export const walletHistoryFindAll = [
  {
    value: 5000,
    type: 'deposit',
    createdAt: '2022-07-23T17:05:35.000Z',
  },
  {
    value: 2000,
    type: 'withdraw',
    createdAt: '2022-07-23T17:05:43.000Z',
  },
  {
    value: 348.3,
    type: 'buyAssets',
    createdAt: '2022-07-23T17:06:00.000Z',
  },
  {
    value: 692.02,
    type: 'buyAssets',
    createdAt: '2022-07-23T17:06:58.000Z',
  }];
