import absoluteUrl from 'next-absolute-url';
import { initMongoose } from "@/lib/mongoose";
import Products from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation';
import NextCors from 'nextjs-cors';


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req, res) {
    const body = await req.json();

    let productsId = body?.products;
    productsId = productsId.split(",");
    const uniqIds = [... new Set(productsId)];
    const products = await Products.find({ _id: { $in: uniqIds } });


    let line_items = [];
    for (let productId of uniqIds) {
        const quantity = productsId.filter(id => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: product.name },
                unit_amount: product.price * 100,
            },
        });


    }

    // In your API route or server-side function
    const { origin } = absoluteUrl(req);

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: 'http://localhost:3000',
      });



    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',

        success_url: `${origin}/?success=true`,
        cancel_url: `${origin}/?canceled=true`,
    });
    console.log(session.url);
    redirect(session.url);
}