import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";

export async function POST(req) {
  try {
    await connection_DB();

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

    if (!Name || !Price) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name and Price are required",
        }),
        { status: 400 }
      );
    }

    const newItem = new ItemsModel({
      Name,
      ItemsIamge: ItemsImage || "", // ✅ Model ke spelling ke hisaab se
      Price,
      DiscountPrice: DiscountPrice || null,
      ItemsDescription: ItemsDescription || "",
      category: category || "",
      Brand: Brand || "",
      Stock: Stock || 0,
      Size: Array.isArray(Size) && Size.length > 0 ? Size : ["Default"],

      // ✅ Colors ko hamesha array bana do
      Colors: Array.isArray(Colors) ? Colors : Colors ? [Colors] : [],

      Rating: Rating || 0,
      Reviews: Array.isArray(Reviews) ? Reviews : [],
      SKU: SKU || `SKU-${Date.now()}`,
      Status: Status || "Active",
    });

    const savedItem = await newItem.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Item created successfully",
        data: savedItem,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating item:", error);

    if (error.code === 11000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "SKU already exists",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
