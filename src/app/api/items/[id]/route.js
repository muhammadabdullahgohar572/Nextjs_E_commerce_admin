
import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";
import { NextResponse } from "next/server";

// DELETE product by ID
export const DELETE = async (req, { params }) => {
  try {
    await connection_DB();

    const { id } = params;
    await ItemsModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
