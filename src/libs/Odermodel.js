import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
  image: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    items: [ItemSchema],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order= mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order