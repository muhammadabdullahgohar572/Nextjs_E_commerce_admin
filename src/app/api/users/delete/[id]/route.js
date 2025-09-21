import connection_DB from "@/libs/Bd_Connection";
import UserModel from "@/libs/UserModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connection_DB();
    const { id } = params;
    await UserModel.findByIdAndDelete(id);
    return NextResponse.json({
      message: "User deleted successfully ✅",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete user ❌",
      error: error.message,
    });
  }
};
