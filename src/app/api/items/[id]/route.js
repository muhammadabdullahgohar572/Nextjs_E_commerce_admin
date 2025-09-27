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

// ✅ UPDATE product by ID
export const PUT = async (req, { params }) => {
  try {
    await connection_DB();

    const { id } = params;
    const body = await req.json();
    const {
      Name,
      ItemsImage,
      Price,
      DiscountPrice,
      ItemsDescription,
      category,
      Brand,
      Stock,
      Size,
      Colors,
      Rating,
      Reviews,
      SKU,
      Status,
    } = body;

    const updatedData = await ItemsModel.findByIdAndUpdate(
      id,
      {
        Name,
        ItemsIamge: ItemsImage || "",
        Price,
        DiscountPrice: DiscountPrice || null,
        ItemsDescription: ItemsDescription || "",
        category: category || "",
        Brand: Brand || "",
        Stock: Stock || 0,
        Size: Array.isArray(Size) && Size.length > 0 ? Size : ["Default"],
        Colors: Array.isArray(Colors) ? Colors : Colors ? [Colors] : [],
        Rating: Rating || 0,
        Reviews: Array.isArray(Reviews) ? Reviews : [],
        SKU: SKU || `SKU-${Date.now()}`,
        Status: Status || "Active",
        updatedAt: Date.now(),
      },
      { new: true } // updated document return karega
    );

    return NextResponse.json({
      success: true,
      message: "Item updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};



// ✅ GET product by ID
export const GET = async (req, { params }) => {
  try {
    await connection_DB();
    const { id } = params;
    const item = await ItemsModel.findById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
