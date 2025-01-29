import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (request.body) {
      const { total_price, stripe_purchase_id, products } =
        await request.json();

      const { data } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id,
          total_price: total_price,
          stripe_purchase_id: stripe_purchase_id,
          products: products,
        })
        .select("id");

      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
