import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("title") as string;
    const nameGeorgian = formData.get("title_ka") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const descriptionGeorgian = formData.get("description_ka") as string;

    const id = request.headers.get("id");
    const table = request.headers.get("table");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createClient();

    if (!stripe) {
      return NextResponse.json(
        { error: "Failed to load stripe" },
        { status: 500 }
      );
    }
    if (table === "products") {
      const price = Number(formData.get("price"));
      const file1 = formData.get("file1") as File;
      const file2 = formData.get("file2") as File;
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
              if (file1.size !== 0 && file2.size !== 0) {
                const file1Name = `${Date.now()}-${file1.name}`;
                try {
                  const { data } = await supabase.storage
                    .from("product-images")
                    .upload(file1Name, file1, {
                      cacheControl: "3600",
                      upsert: false,
                    });
                  if (data) {
                    const {
                      data: { publicUrl: publicUrl1 },
                    } = supabase.storage
                      .from("product-images")
                      .getPublicUrl(file1Name);
                    if (publicUrl1) {
                      const file2Name = `${Date.now()}-${file2.name}`;
                      try {
                        const { data } = await supabase.storage
                          .from("product-images")
                          .upload(file2Name, file2, {
                            cacheControl: "3600",
                            upsert: false,
                          });
                        if (data) {
                          const {
                            data: { publicUrl: publicUrl2 },
                          } = supabase.storage
                            .from("product-images")
                            .getPublicUrl(file2Name);
                          if (publicUrl2) {
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
                                  images: [publicUrl1, publicUrl2],
                                  user_id: user?.id,
                                })
                                .eq("id", id);

                              if (error) {
                                throw error;
                              }
                            } catch (error) {
                              return NextResponse.json(
                                { error },
                                { status: 500 }
                              );
                            }
                          }
                        }
                      } catch (error) {
                        return NextResponse.json(
                          { error: error },
                          { status: 500 }
                        );
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
    } else if (table === "blogs") {
      const { data, error } = await supabase
        .from(table)
        .update({
          title: name,
          title_ka: nameGeorgian,
          description: description,
          category: category,
          description_ka: descriptionGeorgian,
        })
        .eq("id", id);
      if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
      }
      if (data) {
        return NextResponse.json({ code: "Blog Updated" }, { status: 200 });
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
