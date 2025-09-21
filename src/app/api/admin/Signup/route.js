import AdminPanel from "@/libs/admin/AdminMoel";
import connection_DB from "@/libs/Bd_Connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await connection_DB();

    const { password, email, AdminName } = await req.json();

    // check if user exists
    const existingUser = await AdminPanel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new admin
    const accountcreate = new AdminPanel({
      AdminName,
      email,
      password: hashedPassword,
    });

    const savedatabase = await accountcreate.save();

    return NextResponse.json({
      data: savedatabase,
      message: "Account successfully created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Failed to create admin account",
      },
      { status: 500 }
    );
  }
};
