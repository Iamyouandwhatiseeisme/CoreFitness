import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "src/app/actions/getBaseUrl";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const baseUrl = getBaseUrl();
  if (request.body) {
    const { line_items, cart_items } = await request.json();

    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          success_url: `${baseUrl}/orders/result?session_id={CHECKOUT_SESSION_ID}`,
          line_items: line_items,
          mode: "payment",
          metadata: {
            cart_items: JSON.stringify(cart_items),
          },
        });

      return NextResponse.json({
        client_secret: session.client_secret,
        url: session.url,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to checkout" },
        { status: 500 }
      );
    }
  }
}
