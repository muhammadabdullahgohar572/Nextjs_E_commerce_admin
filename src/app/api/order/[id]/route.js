import connection_DB from "@/libs/Bd_Connection";
import Order from "@/libs/Odermodel";

export async function PUT(req, { params }) {
  try {
    await connection_DB();

    const { id } = params; // ✅ [id] folder se hi milega
    const { status } = await req.json();

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Order status updated successfully", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
