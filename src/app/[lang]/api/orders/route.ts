import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import Stripe from "stripe";
import { Order, Product } from "src/app/components/types";

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  var proudcts: Product[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("user_id", user?.id);
    const orders: Order[] = data as Order[];

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
