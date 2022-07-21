export const randomVariation = (value: number, percent: number) => {
  const randomNum = Math.floor(Math.random() * percent * 2) - percent;
  const valueInPercent = (value * randomNum) / 100;
  return Number((value + valueInPercent).toFixed(2));
};
