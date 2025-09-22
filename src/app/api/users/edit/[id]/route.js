import connection_DB from "@/libs/Bd_Connection";
import UserModel from "@/libs/UserModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connection_DB();

    const { id } = params;
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: user, message: "User fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Failed to fetch user" },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connection_DB();

    const { id } = params;
    const body = await req.json();

    const { username, password, email, address, city, Gender, PhoneNumber } = body;

    // 🔐 Password hashing agar password diya gaya ho
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // ✅ Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        address,
        city,
        Gender,
        PhoneNumber,
        ...(password && { password: hashedPassword }), // Only update password if provided
      },
      { new: true } // return updated user
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: updatedUser, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Fail to update user data" },
      { status: 500 }
    );
  }
};
