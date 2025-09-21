import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // good practice to avoid duplicate emails
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  PhoneNumber:{
        type: String,
    required: true,
  }
});

// Avoid recompilation errors in Next.js or hot reload
const UserModel =
  mongoose.models.UserData || mongoose.model("UserData", UserModelSchema);

export default UserModel;
