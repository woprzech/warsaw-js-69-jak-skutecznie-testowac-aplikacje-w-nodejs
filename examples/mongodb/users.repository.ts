import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";

export interface User {
  name: string;
}

export class MongoDBUsersRepository {
  private readonly users: Model<User & Document>;

  constructor() {
    try {
      this.users = mongoose.model<User & Document>('users');
    } catch (e) {
      const schema = new mongoose.Schema({
          name: String,
          age: Number,
        }
      );
      this.users = mongoose.model('users', schema);
    }
  }

  save(user: User) {
    return new this.users(user).save();
  }

  findAll(): Promise<User[]> {
    return this.users.find().lean().exec();
  }

}
