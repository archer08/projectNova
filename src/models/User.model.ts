
import { Document, Types,Schema,model } from 'mongoose';

const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        min: 18,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      shoppingCart: [Object],
      wishlist: [Object],
      address: [Object],
      orders: [Object],
      phoneNumber: {
        type: String,
        required: true,
        match: /^(\+\d{1,3})?\s?(\d{10})$/,
      },
      accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
      isOnline: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );


  export interface UserDocument extends Document {
    password: string;
    _id?: Types.ObjectId;
    username: string;
    email?: string;
    age?: number;
    phoneNumber?: string;
    shoppingCart?: Array<{ productId: Types.ObjectId; quantity: number }>;
    role?: string;
    wishlist?: Array<Types.ObjectId>;
    address?: Array<{
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    }>;
    orders?: Array<{ orderId: Types.ObjectId; status: string }>;
    accountStatus?: string;
    isOnline?: boolean;
  }
  
//   UserSchema.virtual("fullName").get(function () {
//     return `${this.firstName} ${this.lastName}`;
//   });
  
  UserSchema.index({ email: 1 });
  
  export const User = model("User", UserSchema);
  