import mongoose from "mongoose";




type UserAttrs = {

    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    status: string ;

}

type UserDoc = mongoose.Document & UserAttrs & {version: number} 


type UserModel = mongoose.Model<UserDoc> &  {

    buildUser: (attrs: UserAttrs) => Promise<UserDoc>

}