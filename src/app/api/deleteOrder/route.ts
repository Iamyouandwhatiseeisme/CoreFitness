import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (request.body) {
      const { order_id } = await request.json();

      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", order_id);
      if (!error) {
        return NextResponse.json({}, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
