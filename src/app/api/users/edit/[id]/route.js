import connection_DB from "@/libs/Bd_Connection";
import UserModel from "@/libs/UserModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connection_DB();

    const { id } = params; // ✅ Extract ID
    const user = await UserModel.findById(id); // ✅ Correct way

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


export const PUT=async()=>{
    try {
        
    } catch (error) {
        return NextResponse.json({\
            error:error.message,
            message:"Fail to updated user Data"
        })
    }
}