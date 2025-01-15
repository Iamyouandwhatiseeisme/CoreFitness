import { NextRequest, NextResponse } from "next/server";
import ProductPage from "src/app/[lang]/products/[id]/page";
import { Product } from "src/app/components/types";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const headers = request.headers;
  const order_id = headers.get("order_id");
  console.log(order_id);

  try {
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("id", order_id);

    if (data) {
      console.log(data[0].products);
      var productData: Product[] = [];
      for (const product of data[0].products) {
        const { data: fetchedProduct } = await supabase
          .from("products")
          .select()
          .eq("id", product.product_id)
          .single();
        if (fetchedProduct) {
          productData.push(fetchedProduct);
        }
        console.log(productData, "productData");
      }

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
