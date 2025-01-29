import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";
export async function POST(request: NextRequest) {
  try {
    const productId = request.headers.get("id");
    const table = request.headers.get("table");

    const supabase = await createClient();
    if (table && productId) {
      const { data, status } = await supabase
        .from(table)
        .delete()
        .eq("id", productId);
      return NextResponse.json({ status: status, data: data });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
