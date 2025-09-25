import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connection_DB();

    const getdata = await ItemsModel.find();

    return NextResponse.json({
      success: true,
      data: getdata,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to get data",
      },
      { status: 500 } // error code bhi bhejna best practice hai
    );
  }
};
