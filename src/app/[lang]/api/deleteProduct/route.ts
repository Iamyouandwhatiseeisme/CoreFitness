import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
export async function POST(request: NextRequest) {
  try {
    const productId = await request.headers.get("id");

    const supabase = await createClient();
    const { data, status } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
    return NextResponse.json({ status: status, data: data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
