import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
export async function POST(request: NextRequest) {
  try {
    const productId = await request.headers.get("id");
    console.log(productId);

    const supabase = await createClient();
    const { data, status, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
    console.log(data, status, error);
    return NextResponse.json({ status: status });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
