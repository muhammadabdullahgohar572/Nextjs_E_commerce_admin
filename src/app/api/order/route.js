
import connection_DB from "@/libs/Bd_Connection";
import Order from "@/libs/Odermodel";
import { NextResponse } from "next/server"


export const GET=async(req,res)=>{
    try {
        await connection_DB()

        const getallorder=await Order.find();

        return NextResponse.json({
            data:getallorder,
            message:"Get all users"
        })
    } catch (error) {
        return NextResponse.json({
            error:error.message,
            message:"Fail to get user data"
        })
    }
}