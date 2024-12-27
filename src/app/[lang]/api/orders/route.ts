import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import Stripe from "stripe";
import { Order } from "src/app/components/types";

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  var orders: Order[][] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("orders")
      .select("stripe_purchase_id")
      .eq("user_id", user?.id);
    console.log(data);
    if (data) {
      const uniqueIdentifier = Array.from(
        new Set(data.map((item) => item.stripe_purchase_id))
      );
      for (const identifier of uniqueIdentifier) {
        const { data, error } = await supabase
          .from("orders")
          .select()
          .eq("stripe_purchase_id", identifier);
        if (data) {
          orders.push(data);
        }
      }
      console.log(orders, "orders");
      return NextResponse.json(orders, { status: 200 });
    }
    return NextResponse.json({ orders: [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
