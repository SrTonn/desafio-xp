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
