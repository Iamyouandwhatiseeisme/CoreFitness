import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const product_id = request.headers.get("product_id");
    if (product_id) {
      const productIdsArray = JSON.parse(product_id);
      const productIdsAsNumbers = productIdsArray.map((id: string) =>
        Number(id)
      );
      const { data } = await supabase
        .from("products")
        .select()
        .in("id", productIdsAsNumbers);
      return NextResponse.json([data], { status: 200 });
    }

    return NextResponse.json([], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
