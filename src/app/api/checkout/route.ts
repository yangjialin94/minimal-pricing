import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/overview`,
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ message: "Error creating checkout session" }), {
      status: 500,
    });
  }
}
