import mongoose from "mongoose";

export interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: Date;
  madeBy: [
    {
      amount: number | null;
      user: string;
      percent: number | null;
    },
  ];
}

const schema = new mongoose.Schema({
  label: String,
  amount: Number,
  date: Date,
  madeBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: Number,
      percent: Number,
    },
  ],
}, { timestamps: true });

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", schema);
