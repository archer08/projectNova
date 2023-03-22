import { Document, Schema, Types } from "mongoose";

// Interfaces for Review subdocument schema
interface IReview extends Document {
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Interfaces for Image subdocument schema
interface IImage extends Document {
  url: string;
}

// Interfaces for Source subdocument schema
interface ISource extends Document {
  url: string;
}

// Interfaces for Product schema
interface IProduct extends Document {
  _id: Types.ObjectId;
  addedBy: Types.ObjectId;
  name: string;
  category:
    | "Electronics"
    | "Clothes"
    | "Shoes"
    | "Books"
    | "Furniture"
    | "Sports"
    | "Toys"
    | "Tools"
    | "Other";
  description?: string;
  price?: number;
  retailprice: number;
  quantity: number;
  reviews?: IReview[];
  visible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface IFaqAnswer {
  userId: Types.ObjectId;
  answer: string;
}

interface IFaqAnswerUpdate {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  answer: string;
}

export { IReview, IImage, ISource, IProduct, IFaqAnswer, IFaqAnswerUpdate };
