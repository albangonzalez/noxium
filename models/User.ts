import mongoose from "mongoose";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const schema = new mongoose.Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.models.User || mongoose.model<User>("User", schema);
