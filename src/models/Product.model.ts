import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});
const sourceSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

const ProductSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    enum: [
      "Electronics",
      "Clothes",
      "Shoes",
      "Books",
      "Furniture",
      "Sports",
      "Toys",
      "Tools",
      "Other",
    ],
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    unique: true,
  },
  price: {
    type: Number,
  },
  retailprice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  reviews: [reviewSchema],
  visible: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Product", ProductSchema);
