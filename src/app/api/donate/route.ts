import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return new Response(JSON.stringify({ message: "Price ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Map Product IDs to actual prices
    const priceMap: Record<string, number> = {
      prod_Roin99pzYVkC2q: 299, // Small Coffee ($2.99)
      prod_RoinNAN9DGkrpP: 499, // Medium Coffee ($4.99)
      prod_RoiofhYcczXZzW: 699, // Large Coffee ($6.99)
    };
    const priceAmount = priceMap[priceId];

    if (!priceAmount) {
      return new Response(JSON.stringify({ message: "Invalid Price ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a Payment Intent for in-modal payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(JSON.stringify({ message: "Error processing payment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
