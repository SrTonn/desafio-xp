import { IInvestment } from '../interfaces';

const investmentCalculator = <T = number>(stockPrice: T, investmentValue: T) => {
  const result = {} as IInvestment;
  const investmentInteger = Math.floor(Number(investmentValue));
  const left = (investmentInteger % Number(stockPrice));

  result.stockBought = Math.floor(investmentInteger / Number(stockPrice));

  result.investedAmount = Number((investmentInteger - left).toFixed(2));

  const rest = investmentInteger - result.investedAmount;
  result.change = Number((rest + (Number(investmentValue) - investmentInteger)).toFixed(2));

  if (!result.stockBought) result.error = 'Insufficient Investment';

  return result;
};

export { investmentCalculator };
