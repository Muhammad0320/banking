import mongoose from 'mongoose';
import { Passwords } from '../services/Password';

type authAttrs = {
  email: string;
  createdAt: Date;
  password: string;
  passwordConfirm: string;
};

type authDoc = mongoose.Document & authAttrs & { createdAt: Date };

type authModel = mongoose.Model<authDoc> & {
  buildauth: (attrs: authAttrs) => Promise<authDoc>;
};

const authSchema = new mongoose.Schema(
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
        validator: function(this: authDoc, value: string): boolean {
          return this.password === value;
        },

        message: 'Passwords are not the same'
      }
    },

    createdAt: {
      type: Date,
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

authSchema.statics.buildauth = async (attrs: authAttrs) => {
  return await auth.create(attrs);
};

authSchema.pre('save', async function(next) {
  if (this.isModified()) {
    this.password = (await Passwords.hash(this.password)) as string;

    this.passwordConfirm = undefined;
  }

  next();
});

const auth = mongoose.model<authDoc, authModel>('auth', authSchema);

export default auth;
