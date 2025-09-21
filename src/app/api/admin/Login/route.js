import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import AdminPanel from "@/libs/AdminMoel";
import connection_DB from "@/libs/Bd_Connection";

export const POST = async (req) => {
  try {
    await connection_DB();
    const { email, password } = await req.json();
    const getdata = await AdminPanel.findOne({ email });

    if (!getdata) {
      return NextResponse.json({
        message: "Fail to Login email not extist ",
      });
    }

    const cheakpassord = await bcrypt.compare(password, getdata.password);

    if (!cheakpassord) {
      return NextResponse.json(
        { message: "Login failed: Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      data: {
        id: getdata._id,
        username: getdata.AdminName,
        email: getdata.email,
      },
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to Login",
    });
  }
};
