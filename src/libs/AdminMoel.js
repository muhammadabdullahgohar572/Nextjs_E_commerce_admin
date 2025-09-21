import mongoose from "mongoose";

const AdminPanelSchema = new mongoose.Schema({
  AdminName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Model banake export karo
const AdminPanel =mongoose.models.AdminPanel || mongoose.model("AdminPanel", AdminPanelSchema);

export default AdminPanel;
