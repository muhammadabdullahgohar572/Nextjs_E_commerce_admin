import mongoose from "mongoose";
const ItemsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  ItemsIamge: { type: String }, // ✅ Correct spelling
  Price: { type: Number, required: true },
  DiscountPrice: { type: Number },
  ItemsDescription: { type: String },
  category: { type: String },
  Brand: { type: String },
  Stock: { type: Number, default: 0 },
  Size: { type: [String] },
  Colors: { type: [String] },
  Rating: { type: Number, default: 0, min: 0, max: 5 },
  Reviews: [{ user: String, comment: String, rating: Number }],
  SKU: { type: String, unique: true },
  Status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ItemsModel =
  mongoose.models.AllItemsData || mongoose.model("AllItemsData", ItemsSchema);

export default ItemsModel;
