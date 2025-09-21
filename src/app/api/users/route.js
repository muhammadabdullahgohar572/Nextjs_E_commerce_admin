import connection_DB from "@/libs/Bd_Connection"
import UserModel from "@/libs/UserModel"
import { NextResponse } from "next/server"


export const GET=async(req,res)=>{
    try {
        await connection_DB()

        const getallusers=await UserModel.find();

        return NextResponse.json({
            data:getallusers,
            message:"Get all users"
        })
    } catch (error) {
        return NextResponse.json({
            error:error.message,
            message:"Fail to get user data"
        })
    }
}