import { NextRequest, NextResponse } from "next/server";
import ProductPage from "src/app/[lang]/products/[id]/page";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const headers = request.headers;
  const order_id = headers.get("order_id");
  console.log("2");

  try {
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("user_id", user?.id)
      .in("id", [order_id]);

    if (data) {
      const order = data[0];
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select()
        .eq("id", order.product_id);
      console.log(productData);
      return NextResponse.json(productData, { status: 200 });
    }
    return NextResponse.json(data, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
