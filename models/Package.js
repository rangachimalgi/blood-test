import mongoose from "mongoose";

const IncludedTestSchema = new mongoose.Schema({
  categoryName: String,
  tests: [String],
});

const PackageSchema = new mongoose.Schema({
  id: String,
  productName: String,
  type: { type: String, default: "package" },
  includedTests: [IncludedTestSchema],
  desc: String,
  imgUrl: String,
  category: String,
  mrp: Number,
  price: Number,
  discount: Number,
  shortDesc: String,
  description: String,
  overlayTitle: String,
  overlayDetails: [String],
  avgRating: Number,
  reviews: [
    {
      rating: Number,
      text: String,
    },
  ],
});

export default mongoose.model("Package", PackageSchema);
