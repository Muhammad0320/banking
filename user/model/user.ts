import mongoose from 'mongoose';

type UserAttrs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  status: string;
  role: string;
  createdAt: Date;
};

type UserDoc = mongoose.Document & UserAttrs & { version: number };

type UserModel = mongoose.Model<UserDoc> & {
  buildUser: (attrs: UserAttrs) => Promise<UserDoc>;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [4, 'Name should be at least 4 chars.']
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'This field is required.']
  },

  password: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [8, 'Your password should be more than 8 chars.'],
    select: false
  },

  passwordConfirm: {
    type: String,
    validate: {
      validator: function(this: UserDoc, value: string): boolean {
        return this.password === value;
      },

      message: 'Passwords are not the same'
    }
  },

  role: {
    type: String,
    required: [true, 'This field is required']
  },

  status: {
    type: String,
    required: [true, 'This field is required']
  },

  createdAt: {
    type: String,
    default: new Date()
  }
});
