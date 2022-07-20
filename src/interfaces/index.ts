export interface IUser {
  nickName?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IInvestment {
  stockBought: number;
  investedAmount: number;
  change: number;
  error?: string;
}
