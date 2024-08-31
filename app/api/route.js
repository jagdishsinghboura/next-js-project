import { initMongoose } from "@/lib/mongoose";
import Products from "@/models/product";

import { NextResponse } from "next/server";

async function findAllProducts() {
   const product = await Products.find({})
   return product;
}

export async function GET(req, { params }) {
   await initMongoose()
   return NextResponse.json(await findAllProducts())
}


