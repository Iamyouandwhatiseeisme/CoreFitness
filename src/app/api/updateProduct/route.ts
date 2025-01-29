import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const nameGeorgian = formData.get("name-georgian") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const descriptionGeorgian = formData.get("description-georgian") as string;
    const price = Number(formData.get("price"));
    const file = formData.get("file") as File;
    const id = request.headers.get("id");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createClient();

    if (!stripe) {
      return NextResponse.json(
        { error: "Failed to load stripe" },
        { status: 500 }
      );
    }
    try {
      const stripeProduct = await stripe.products.create({
        name: name,
      });
      if (stripeProduct) {
        try {
          const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: price,
            currency: "usd",
          });
          if (stripePrice) {
            if (file.size !== 0) {
              const fileName = `${Date.now()}-${file.name}`;
              try {
                const { data } = await supabase.storage
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
                      const { error } = await supabase
                        .from("products")
                        .update({
                          title: name,
                          title_ka: nameGeorgian,
                          description: description,
                          category: category,
                          description_ka: descriptionGeorgian,
                          price: price,
                          stripe_product_id: stripeProduct.id,
                          stripe_price_id: stripePrice.id,
                          img_url: publicUrl,
                          user_id: user?.id,
                        })
                        .eq("id", id);

                      if (error) {
                        throw error;
                      }
                    } catch (error) {
                      return NextResponse.json({ error }, { status: 500 });
                    }
                  }
                }
              } catch (error) {
                return NextResponse.json({ error: error }, { status: 500 });
              }
            } else {
              try {
                const { data, error } = await supabase
                  .from("products")
                  .update({
                    title: name,
                    title_ka: nameGeorgian,
                    description: description,
                    category: category,
                    description_ka: descriptionGeorgian,
                    price: price,
                  })
                  .eq("id", id);
                console.log(data, error, "product");
                if (data) {
                  return NextResponse.json(
                    { code: "Product updated" },
                    { status: 200 }
                  );
                }

                if (error) {
                  throw error;
                }
              } catch (error) {
                return NextResponse.json({ error }, { status: 500 });
              }
            }
          }
        } catch (error) {
          return NextResponse.json({ error: error }, { status: 500 });
        }
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ code: "Product updated" }, { status: 200 });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
