import { initMongoose } from "@/lib/mongoose";
import Products from "@/models/product";
import { NextResponse } from "next/server";



export  async function GET(req) {
   await initMongoose();
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("ids");
    
    try {
        const data = await Products.find({ "_id": { $in: param.split(',') } })

        
        return NextResponse.json(data)
    } catch (error) {
        console.log("error",error);
    }
}
