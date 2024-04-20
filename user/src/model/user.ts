import mongoose from 'mongoose';
import { Passwords } from '../services/Password';
import { UserStatus } from '../enums/UserStatus';
import { UserRole } from '../enums/UserRoles';

type UserAttrs = {
  name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  avatar: string;
  createdAt: Date;
};

type UserDoc = mongoose.Document & UserAttrs & { version: number };

type UserModel = mongoose.Model<UserDoc> & {
  buildUser: (attrs: UserAttrs) => Promise<UserDoc>;
};

const userSchema = new mongoose.Schema(
  {
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

    role: {
      type: String,
      default: 'user',
      enum: Object.values(UserRole)
    },

    status: {
      type: String,
      required: [true, 'This field is required'],
      enum: Object.values(UserStatus)
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

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
