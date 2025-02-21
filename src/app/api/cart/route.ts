import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    try {
      const { data } = await supabase
        .from("cart")
        .select()
        .eq("user_id", user.id)
        .single();
      if (data.products === null) {
        return NextResponse.json([], { status: 200 });
      }

      if (data) {
        const products = data.products;
        if (products !== null) {
          const productDetails = await Promise.all(
            products.map(
              async (product: { product_id: number; quantity: number }) => {
                const { data, error } = await supabase
                  .from("products")
                  .select()
                  .eq("id", product.product_id)
                  .single();
                if (error) {
                  throw error;
                }
                return { product: data, quantity: product.quantity };
              }
            )
          );
          return NextResponse.json(productDetails, { status: 200 });
        }
      }

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "no user" }, { status: 500 });
  }
}
