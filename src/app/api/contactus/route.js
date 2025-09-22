import connection_DB from "@/libs/Bd_Connection";
import ContactUsModel from "@/libs/Contactus";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connection_DB();

    const getalluserscontactus = await ContactUsModel.find();

    return NextResponse.json({
      data: getalluserscontactus,
      message: "Get all users",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to get user data",
    });
  }
};
