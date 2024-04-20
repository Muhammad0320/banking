import mongoose from 'mongoose';

enum AccountType {
  Current = 'current',
  Savings = 'savings',
  Investment = 'investment'
}

enum AccountCurrency {
  NGN = 'NGN',
  USD = 'USD'
}

type AccountAttrs = {
  balance: number;

  status: string;

  userId: string;

  tier: string;

  type: AccountType;

  createdAt: Date;

  currency: AccountCurrency;
};

type AccountDoc = mongoose.Document & AccountAttrs & { version: number };

type AccountModel = mongoose.Model<AccountDoc> & {
  buildAccount(attrs: AccountAttrs): Promise<AccountDoc>;
};
