import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { Order, Product } from "src/app/components/types";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const product_id = request.headers.get("product_id");

    const { data } = await supabase
      .from("products")
      .select()
      .eq("id", product_id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
