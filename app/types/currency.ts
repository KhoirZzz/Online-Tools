export type CurrencyResponse = {
  from: string;
  to: string;
  amount: number | string;
  rate: number | string;
  date: string;
};

export type CurrencyError = {
  message: string;
  code?: string;
  status?: number;
};

export type Currency = {
  code: string;
  name: string;
  country: string;
}; 