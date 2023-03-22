import mongoose, { Document, Schema } from "mongoose";

export interface IFaq {
  userId: mongoose.Types.ObjectId;
  question: string;
  product?: mongoose.Types.ObjectId;
  answers: IFaqAnswer[];
}

export interface IFaqAnswer {
  //   _id: mongoose.Types.ObjectId;
  faqId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answer: string;
  createdAt?: Date;
}

const FaqAnswerSchema = new Schema<IFaqAnswer>({
  faqId: {
    type: Schema.Types.ObjectId,
    ref: "Faq",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FaqSchema = new Schema<IFaq>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
    unique: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});
const Faq = mongoose.model<IFaq>("Faq", FaqSchema);
const FaqAnswer = mongoose.model<IFaqAnswer>("FaqAnswer", FaqAnswerSchema);

export { Faq, FaqAnswer };
