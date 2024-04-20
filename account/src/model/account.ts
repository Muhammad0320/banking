import mongoose from 'mongoose';
import { AccountStatus } from '../enums/AccountStatusEnum';
import { AccountType } from '../enums/AccountTypeEnum';
import { AccountCurrency } from '../enums/AccountCurrencyEnum';

type AccountAttrs = {
  balance: number;

  status: AccountStatus;

  userId: string;

  tier: string;

  type: AccountType;

  currency: AccountCurrency;
};

type AccountDoc = mongoose.Document & AccountAttrs & { version: number };

type AccountModel = mongoose.Model<AccountDoc> & {
  buildAccount(attrs: AccountAttrs): Promise<AccountDoc>;
};

const accountSchema = new mongoose.Schema({
  balance: {
    type: String,

    required: true
  },

  status: {
    type: String,

    required: true,

    enum: Object.values(AccountStatus)
  },

  tier: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: Object.values(AccountType)
  },

  currency: {
    type: String,
    required: true,
    enum: Object.values(AccountCurrency)
  },

  userId: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

accountSchema.statics.buildAccount = async (attrs: AccountAttrs) => {
  return await Account.create(attrs);
};

const Account = mongoose.model<AccountDoc, AccountModel>(
  'Account',
  accountSchema
);

export default Account;
