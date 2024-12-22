import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const file = formData.get("file") as File;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createClient();

    if (!stripe) {
      return NextResponse.json(
        { error: "Failed to load stripe" },
        { status: 500 }
      );
    }
    try {
      var stripeProduct = await stripe.products.create({
        name: name,
      });
      if (stripeProduct) {
        try {
          var stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: price,
            currency: "usd",
          });
          if (stripePrice) {
            const fileName = `${Date.now()}-${file.name}`;
            try {
              const { data, error } = await supabase.storage
                .from("product-images")
                .upload(fileName, file, {
                  cacheControl: "3600",
                  upsert: false,
                });
              if (data) {
                const {
                  data: { publicUrl },
                } = supabase.storage
                  .from("product-images")
                  .getPublicUrl(fileName);
                if (publicUrl) {
                  try {
                    const {
                      data: { user },
                    } = await supabase.auth.getUser();
                    const { error } = await supabase.from("products").insert({
                      title: name,
                      price: price,
                      stripe_product_id: stripeProduct.id,
                      stripe_price_id: stripePrice.id,
                      img_url: publicUrl,
                      user_id: user?.id,
                    });
                  } catch (error) {
                    return NextResponse.json(
                      { error: "Failed to create product on supabase" },
                      { status: 500 }
                    );
                  }
                }
              }
            } catch (error) {
              return NextResponse.json(
                { error: "Failed to upload image to storage" },
                { status: 500 }
              );
            }
          }
        } catch (error) {
          return NextResponse.json(
            { error: "Failed to create stripePrice" },
            { status: 500 }
          );
        }
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
