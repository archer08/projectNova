import { Document, Types, Schema, model } from "mongoose";

interface Address {
  city: string;
  state: string;
  country: string;
  street: string;
  postalCode: string;
}

export interface UserDocument extends Document {
  username: string;
  age?: number;
  role?: "user" | "admin";
  email: string;
  password: string;
  address?: Address[];
  phoneNumber: string;
  accountStatus?: "active" | "inactive";
  isOnline?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<Address>({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const UserSchema = new Schema<UserDocument>(
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
    address: [AddressSchema],
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

UserSchema.index({ email: 1 });

export const User = model<UserDocument>("User", UserSchema);
