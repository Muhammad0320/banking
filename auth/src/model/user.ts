import mongoose from 'mongoose';
import { Passwords } from '../services/Password';

type UserAttrs = {
  email: string;
  createdAt: Date;
  password: string;
  passwordConfirm: string;
};

type UserDoc = mongoose.Document & UserAttrs & { createdAt: Date };

type UserModel = mongoose.Model<UserDoc> & {
  buildUser: (attrs: UserAttrs) => Promise<UserDoc>;
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'This field is required.']
    },

    password: {
      type: String,
      required: [true, 'This field is required.'],
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

    createdAt: {
      type: String,
      default: new Date()
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id; //
      }
    }
  }
);

userSchema.statics.buildUser = async (attrs: UserAttrs) => {
  return await User.create(attrs);
};

userSchema.pre('save', async function(next) {
  if (this.isModified()) {
    this.password = (await Passwords.hash(this.password)) as string;

    this.passwordConfirm = undefined;
  }

  next();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
